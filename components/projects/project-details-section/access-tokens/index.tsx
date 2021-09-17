import { Project, AccessToken } from ".prisma/client";
import { Button } from "@chakra-ui/button";
import { Box, Code, Heading, HStack } from "@chakra-ui/layout";
import { useCreateAccessTokenMutation } from "hooks/useCreateAccessTokenMutation";

import React from "react";

import AccessTokenCard from "./access-token-card";

const AccessTokens = ({
  project,
}: {
  project: Project & { accessTokens: ReadonlyArray<AccessToken> };
}) => {
  const createAccessTokenMutation = useCreateAccessTokenMutation();

  return (
    <Box>
      <Box mb={8}>
        <Heading mb={1} size="md">
          Project id
        </Heading>
        <Code>{project.id}</Code>
      </Box>

      <HStack mb={4}>
        <Heading mb={1} size="md">
          Project secrets
        </Heading>
        <Button
          size="sm"
          onClick={() =>
            createAccessTokenMutation.mutate({ projectId: project.id })
          }
        >
          Create new secret
        </Button>
      </HStack>
      <Box>
        {project?.accessTokens?.map((accessToken) => (
          <AccessTokenCard key={accessToken.id} accessToken={accessToken} />
        ))}
      </Box>
    </Box>
  );
};

export default AccessTokens;
