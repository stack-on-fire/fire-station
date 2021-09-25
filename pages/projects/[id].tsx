import React, { useState } from "react";
import { Navbar } from "components";
import {
  Project as ProjectType,
  Endpoint,
  AccessToken,
  Dashboard,
  Widget,
} from "@prisma/client";
import {
  Box,
  HStack,
  Divider,
  Input,
  VStack,
  Text,
  Skeleton,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
  Button,
  Badge,
} from "@chakra-ui/react";
import { QueryClient } from "react-query";
import {
  fetchProject,
  useCreateDashboardMutation,
  useCreateEndpointMutation,
  useProject,
} from "hooks";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import Fuse from "fuse.js";

import Breadcrumbs from "components/projects";
import ProjectSection from "components/projects/project-section";
import EndpointDetailsSection from "components/projects/endpoint-details-section";
import ProjectDetailsSection from "components/projects/project-details-section";
import DashboardDetailsSection from "components/projects/dashboard-details-section";
import { useAppUrl } from "hooks/useAppUrl";

const Project = () => {
  const router = useRouter();
  const {
    data: project,
  }: {
    data: ProjectType & {
      endpoints: ReadonlyArray<Endpoint>;
      dashboards: ReadonlyArray<Dashboard & { widgets: ReadonlyArray<Widget> }>;

      accessTokens: ReadonlyArray<AccessToken>;
    };
  } = useProject({ id: router.query.id });
  const appUrl = useAppUrl();

  const selectedEndpoint = project?.endpoints.find(
    (endpoint) => endpoint.id === router.query.endpoint
  );

  const selectedDashboard = project?.dashboards.find(
    (dashboard) => dashboard.id === router.query.dashboard
  );

  const setSelectedEndpoint = (endpoint: Endpoint) =>
    router.push(
      {
        pathname: router.pathname,
        query: { endpoint: endpoint.id },
      },
      `${project.id}?endpoint=${endpoint.id}`,
      { shallow: true }
    );

  const setSelectedDashboard = (dashboard: Dashboard) =>
    router.push(
      {
        pathname: router.pathname,
        query: { dashboard: dashboard.id },
      },
      `${project.id}?dashboard=${dashboard.id}`,
      { shallow: true }
    );

  const createEndpointMutation = useCreateEndpointMutation(setSelectedEndpoint);
  const createDashboardMutation =
    useCreateDashboardMutation(setSelectedDashboard);

  const [searchString, setSearchString] = useState("");
  const [isEditingEndpoint, setEditingEndpoint] = useState(false);
  const [name, setName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [dashboardName, setDashboardName] = useState("");
  const [color, setColor] = useState(null);

  useEffect(() => {
    if (selectedEndpoint) {
      setName(selectedEndpoint.name);
      setDescription(selectedEndpoint.description);
      setColor(selectedEndpoint.color);
    }
  }, [project, selectedEndpoint]);

  useEffect(() => {
    setEditingEndpoint(false);
    if (selectedEndpoint) {
      setName(selectedEndpoint.name);
      setDescription(selectedEndpoint.description);
    }
    if (project) {
      setProjectName(project.name);
    }
  }, [router.pathname, selectedEndpoint, project]);

  const options = {
    includeScore: true,
    keys: ["name"],
  };
  const fuse = new Fuse(project?.endpoints, options);
  const result = project?.endpoints ? fuse.search(searchString) : [];
  const usedEndpoints = searchString
    ? result.map(({ item }) => item)
    : project?.endpoints;

  return (
    <>
      <Navbar />
      <Box p={4} maxW={1200} mx="auto">
        <Breadcrumbs selectedEndpoint={selectedEndpoint} project={project} />
        {project ? (
          <ProjectSection project={project} />
        ) : (
          <HStack alignItems="center">
            <Skeleton height={100} width={100} />
            <VStack>
              <Skeleton height={8} width={300} />
              <Skeleton height={8} width={300} />
            </VStack>
          </HStack>
        )}

        <Divider my={4} />
        {router.query.settings === "true" ? (
          <ProjectDetailsSection
            project={project}
            projectName={projectName}
            setProjectName={setProjectName}
          />
        ) : (
          <Box>
            <Tabs isLazy variant="enclosed">
              <TabList mb="1em">
                <Tab>Endpoints</Tab>
                <Tab>Dashboards</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {!selectedEndpoint && (
                    <HStack mb={4}>
                      <Button
                        onClick={() => {
                          createEndpointMutation.mutate({
                            projectId: project.id,
                          });
                        }}
                      >
                        Add endpoint
                      </Button>
                      <Input
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                        placeholder="Search endpoints"
                      />
                    </HStack>
                  )}
                  <EndpointDetailsSection
                    project={project}
                    usedEndpoints={usedEndpoints}
                    selectedEndpoint={selectedEndpoint}
                    setSelectedEndpoint={setSelectedEndpoint}
                    isEditingEndpoint={isEditingEndpoint}
                    setEditingEndpoint={setEditingEndpoint}
                    name={name}
                    setName={setName}
                    description={description}
                    setDescription={setDescription}
                    color={color}
                    setColor={setColor}
                  />
                </TabPanel>
                <TabPanel>
                  {!selectedDashboard && (
                    <Box>
                      <Button
                        mb={2}
                        onClick={() => {
                          createDashboardMutation.mutate({
                            projectId: project.id,
                            name: dashboardName,
                          });
                        }}
                      >
                        Add dashboard
                      </Button>
                      <HStack mb={4}>
                        <HStack>
                          <Badge>{appUrl}/dashboard</Badge>
                          <Text>/</Text>
                          <Input
                            value={dashboardName}
                            onChange={(e) => setDashboardName(e.target.value)}
                            size="xs"
                          />
                        </HStack>
                      </HStack>
                    </Box>
                  )}
                  <DashboardDetailsSection
                    selectedDashboard={selectedDashboard}
                    setSelectedDashboard={setSelectedDashboard}
                    project={project}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Project;

export const getServerSideProps = async ({ query }) => {
  const projectId = query.id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["project", projectId], () =>
    fetchProject(projectId)
  );

  return { props: { dehydratedState: dehydrate(queryClient) } };
};
