import React, { useState } from "react";
import { Project, Endpoint } from "@prisma/client";

import { Box } from "@chakra-ui/layout";
import { Navbar } from "components";
import {
  Button,
  Flex,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue as mode,
  FormControl,
  InputGroup,
  FormLabel,
  Input,
  Skeleton,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import ProjectCard from "components/project-card";

import { useProjects } from "hooks";
import { useMutation, useQueryClient } from "react-query";

import { useAppUrl } from "hooks/useAppUrl";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";

const Index = () => {
  const [session] = useSession();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projectName, setProjectName] = useState("");
  const queryClient = useQueryClient();
  const appUrl = useAppUrl();

  const {
    data: projects,
    isLoading,
  }: {
    data: {
      projects: ReadonlyArray<Project & { endpoints: ReadonlyArray<Endpoint> }>;
      unreadEventsCount: number;
    };
    isLoading: boolean;
  } = useProjects({ skip: !!session });

  const createProjectMutation = useMutation(
    ({ projectName }: { projectName: string }) =>
      fetch(`${appUrl}/api/project/create?projectName=${projectName}`),
    {
      onSuccess: async () => {
        await queryClient.refetchQueries(["projects"]);
      },
    }
  );

  return (
    <Box>
      <Navbar />

      <Box maxW={1200} mx="auto">
        {session && (
          <Flex
            align="center"
            justify={["center", "center", "left"]}
            borderBottom="1px solid"
            borderColor="gray.600"
            height="80px"
            p={[0, 0, 4]}
            transition="all 0.3s"
          >
            <Button
              onClick={() => {
                if (session) {
                  onOpen();
                } else {
                  router.push("/signin", null, { shallow: true });
                }
              }}
              leftIcon={<PlusSquareIcon />}
            >
              New Project
            </Button>
          </Flex>
        )}
        {session?.user && isLoading ? (
          <SimpleGrid p={4} columns={[1, 2, 3, 4]} spacing={4} gridGap={2}>
            <Skeleton width="280px" height="150px" />
            <Skeleton width="280px" height="150px" />
            <Skeleton width="280px" height="150px" />
          </SimpleGrid>
        ) : (
          <SimpleGrid p={4} columns={[1, 2, 3, 4]} spacing={4} gridGap={2}>
            {projects?.projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                unreadEventsCount={projects.unreadEventsCount}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="project name">
              <InputGroup>
                <FormLabel srOnly>Enter project name</FormLabel>
                <Input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  bg={mode("white", "gray.800")}
                  placeholder="Project name"
                />
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button
              mr={3}
              onClick={async () => {
                await createProjectMutation.mutateAsync({ projectName });
                onClose();
              }}
            >
              Create a project
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
