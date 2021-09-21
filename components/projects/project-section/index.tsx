import React from "react";
import {
  Box,
  HStack,
  Heading,
  VStack,
  IconButton,
  Icon,
} from "@chakra-ui/react";

import { CgEditBlackPoint } from "react-icons/cg";
import BoringAvatar from "boring-avatars";
import { Project, Endpoint } from "@prisma/client";
import { useRouter } from "next/dist/client/router";
import { SettingsIcon } from "@chakra-ui/icons";

const ProjectSection = ({
  project,
}: {
  project: Project & { endpoints: ReadonlyArray<Endpoint> };
}) => {
  const router = useRouter();

  return (
    <HStack spacing={3} alignItems="start">
      <BoringAvatar
        size={100}
        name={project?.id}
        variant="bauhaus"
        square
        colors={["#B31237", "#F03813", "#FF8826", "#FFB914", "#2C9FA3"]}
      />
      <VStack alignItems="start">
        <HStack>
          <Heading>{project.name}</Heading>
        </HStack>
        <HStack spacing={4}>
          <HStack spacing={0}>
            <Icon as={CgEditBlackPoint} w={8} h={8} color="red.400" />
            <Box>{project.endpoints.length}</Box>
          </HStack>
          <HStack>
            <IconButton
              onClick={() =>
                router.push(
                  {
                    pathname: router.pathname,
                    query: { settings: true },
                  },
                  `${project.id}?settings=true`,
                  { shallow: true }
                )
              }
              aria-label="Settings"
              icon={<SettingsIcon />}
            />
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default ProjectSection;
