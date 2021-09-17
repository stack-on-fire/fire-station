import { Event } from ".prisma/client";
import { Button } from "@chakra-ui/button";
import { Box, Heading } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/react";
import { useCreateEventMutation } from "hooks";

import React from "react";

const EventsTable = ({ events }: { events: ReadonlyArray<Event> | [] }) => {
  const sendEventMutation = useCreateEventMutation();

  console.log(events);

  return (
    <Box>
      <HStack>
        <Heading>Table</Heading>
        {process.env.NODE_ENV === "development" && (
          <Button
            size="sm"
            onClick={() =>
              sendEventMutation.mutate({ endpoint: "email-signup" })
            }
            colorScheme="green"
          >
            Send event
          </Button>
        )}
      </HStack>
    </Box>
  );
};

export default EventsTable;
