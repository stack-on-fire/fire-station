import React, { useState } from "react";
import { Navbar } from "components";
import { Project as ProjectType, Endpoint, AccessToken } from "@prisma/client";
import {
  Box,
  HStack,
  Divider,
  Input,
  VStack,
  Skeleton,
} from "@chakra-ui/react";
import { QueryClient } from "react-query";
import { fetchProject, useProject } from "hooks";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import Fuse from "fuse.js";

import Breadcrumbs from "components/projects";
import ProjectSection from "components/projects/project-section";
import EndpointDetailsSection from "components/projects/endpoint-details-section";
import ProjectDetailsSection from "components/projects/project-details-section";

const Project = () => {
  const router = useRouter();
  const {
    data: project,
  }: {
    data: ProjectType & {
      endpoints: ReadonlyArray<Endpoint>;
      accessTokens: ReadonlyArray<AccessToken>;
    };
  } = useProject({ id: router.query.id });
  const selectedEndpoint = project?.endpoints.find(
    (endpoint) => endpoint.id === router.query.endpoint
  );

  const [isEditingEndpoint, setEditingEndpoint] = useState(false);
  const [name, setName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    if (selectedEndpoint) {
      setName(selectedEndpoint.name);
      setDescription(selectedEndpoint.description);
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

  const setSelectedEndpoint = (endpoint: Endpoint) =>
    router.push(
      {
        pathname: router.pathname,
        query: { endpoint: endpoint.id },
      },
      `${project.id}?endpoint=${endpoint.id}`,
      { shallow: true }
    );

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
          <ProjectSection
            project={project}
            setSelectedEndpoint={setSelectedEndpoint}
          />
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
            {!selectedEndpoint && (
              <Box mb={4}>
                <Input
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                  placeholder="Search endpoints"
                />
              </Box>
            )}
            <EndpointDetailsSection
              project={project}
              selectedEndpoint={selectedEndpoint}
              setName={setName}
              isEditingEndpoint={isEditingEndpoint}
              setEditingEndpoint={setEditingEndpoint}
              usedEndpoints={usedEndpoints}
              name={name}
              description={description}
              setDescription={setDescription}
              setSelectedEndpoint={setSelectedEndpoint}
            />
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
