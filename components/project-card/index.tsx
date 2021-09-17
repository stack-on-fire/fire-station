import React from "react";
import { Box } from "@chakra-ui/layout";
import {
  Flex,
  HStack,
  Icon,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import Link from "next/link";
import { Project } from "@prisma/client";
import BoringAvatar from "boring-avatars";
import { HiArchive } from "react-icons/hi";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link as={`/projects/${project.id}`} href="/projects/[id]">
      <Flex
        direction="column"
        justifyContent="space-between"
        p={4}
        border="1px solid"
        borderRadius={2}
        borderColor="gray.300"
        height="140px"
        _hover={{ shadow: { sm: "lg" } }}
        role="group"
        cursor="pointer"
        transition="all 0.2s"
      >
        <Box>
          <HStack>
            <BoringAvatar
              size={30}
              name={project.id}
              variant="bauhaus"
              square
              colors={["#B31237", "#F03813", "#FF8826", "#FFB914", "#2C9FA3"]}
            />

            <Text
              as="h3"
              fontWeight="bold"
              fontSize="lg"
              _groupHover={{ color: "red.400" }}
            >
              {project.name}
            </Text>
          </HStack>
          <Text fontSize="sm" mt="1" color={mode("gray.600", "gray.200")}>
            {project.description}
          </Text>
        </Box>
        <HStack>
          {project.isArchived && (
            <Icon fontSize="xl" as={HiArchive} color="gray.500" />
          )}
        </HStack>
      </Flex>
    </Link>
  );
};

export default ProjectCard;
