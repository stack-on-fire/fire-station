import React, { useState } from "react";
import {
  Box,
  HStack,
  Button,
  IconButton,
  Input,
  Heading,
  Text,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
} from "@chakra-ui/react";

import { useProjectMutation } from "hooks";

import { useRouter } from "next/dist/client/router";
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import AccessTokens from "./access-tokens";
import MainSection from "../main-section";

const DetailsSection = ({ project, projectName, setProjectName }) => {
  const router = useRouter();
  const [isEditingProject, setEditingProject] = useState(false);

  const projectMutation = useProjectMutation();

  return (
    <>
      <Box>
        <HStack mb={4}>
          <Button
            onClick={() =>
              router.push(
                {
                  pathname: router.pathname,
                },
                `${project.id}`,
                { shallow: true }
              )
            }
            size="md"
            aria-label="Back arrow"
            leftIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
          <Heading size="md">Project settings</Heading>
        </HStack>
        <Tabs variant="enclosed">
          <TabList mb="1em">
            <Tab>Main</Tab>
            <Tab>Details</Tab>
            <Tab>Access tokens</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {project && <MainSection projectId={project.id} />}
            </TabPanel>
            <TabPanel>
              <HStack mb={2}>
                {isEditingProject ? (
                  <Input
                    onChange={(e) => setProjectName(e.target.value)}
                    value={projectName}
                    size="sm"
                  />
                ) : (
                  <Text fontSize="lg">{project?.name}</Text>
                )}
                {isEditingProject ? (
                  <Button
                    onClick={() => {
                      projectMutation.mutate({
                        id: project.id,
                        name: projectName,
                      });
                      setEditingProject(false);
                    }}
                  >
                    Save
                  </Button>
                ) : (
                  <IconButton
                    onClick={() => setEditingProject(!isEditingProject)}
                    size="sm"
                    aria-label="Edit"
                    icon={<EditIcon />}
                  />
                )}
              </HStack>
            </TabPanel>
            <TabPanel>{project && <AccessTokens project={project} />}</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default DetailsSection;
