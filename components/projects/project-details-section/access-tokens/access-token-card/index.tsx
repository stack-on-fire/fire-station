import { AccessToken } from ".prisma/client";
import { Button } from "@chakra-ui/button";
import { useClipboard } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";

import { Box, Code, Heading, HStack, Text } from "@chakra-ui/layout";

import { format } from "date-fns";
import { useDeleteAccessTokenMutation } from "hooks";
import React from "react";
import { HiKey } from "react-icons/hi";

const AccessTokenCard = ({ accessToken }: { accessToken: AccessToken }) => {
  const { hasCopied, onCopy } = useClipboard(accessToken.jwt);
  const deleteAccessTokenMutation = useDeleteAccessTokenMutation();

  return (
    <Box
      mb={2}
      border="1px solid"
      borderColor="gray.400"
      p={4}
      key={accessToken.id}
    >
      <HStack mb={1}>
        <Icon color="red.400" fontSize="xl" as={HiKey} />
        <Heading size="sm"> Secret</Heading>
        <Button size="xs" onClick={onCopy} ml={2}>
          {hasCopied ? "Copied" : "Copy"}
        </Button>
        <Button
          onClick={() =>
            deleteAccessTokenMutation.mutate({ id: accessToken.id })
          }
          variant="ghost"
          colorScheme="red"
          size="xs"
          ml={2}
        >
          Revoke
        </Button>
      </HStack>
      <Text color="gray.500" mb={2}>
        Created: {format(new Date(accessToken.createdAt), "PP")}
      </Text>

      <Code display="bock" whiteSpace="pre-wrap">
        {accessToken.jwt}
      </Code>
    </Box>
  );
};

export default AccessTokenCard;
