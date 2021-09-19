import { Endpoint, Event, Project } from ".prisma/client";
import { useColorModeValue } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { useChannel, useEvent } from "@harelpls/use-pusher";
import EventsTable from "components/events-table";
import { useEventsByProject } from "hooks";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { useQueryClient } from "react-query";

const MainSection = ({ projectId }: { projectId: Project["id"] }) => {
  const [page, setPage] = useState(1);
  const channel = useChannel("fire-station-events");
  const toastBgColor = useColorModeValue("white", "gray.600");
  const toastTextColor = useColorModeValue("black", "white");

  const queryClient = useQueryClient();

  useEvent(
    channel,
    "create-event",
    ({ event }: { event: Event & { endpoint: Endpoint } }) => {
      toast.custom(
        <Box
          bg={toastBgColor}
          px={3}
          py={4}
          boxShadow="0 3px 10px rgb(0 0 0 / 10%), 0 3px 3px rgb(0 0 0 / 5%)"
          borderRadius={4}
        >
          <HStack>
            <Icon as={FaCheckCircle} w={4} h={4} color="green.400" />
            <Text color={toastTextColor}>
              New <b>{event.endpoint.name}</b> event
            </Text>
          </HStack>
        </Box>
      );
      queryClient.refetchQueries("eventsByProject");
    }
  );

  const { data: events, isLoading } = useEventsByProject({
    projectId,
    take: 10,
    skip: page === 1 ? 0 : (page - 1) * 10,
  });

  if (isLoading) return <div>loading...</div>;

  return (
    <Box>
      {events ? (
        <EventsTable
          events={events.events}
          totalCount={events.totalCount._count}
          setPage={setPage}
          currentPage={page}
        />
      ) : null}
    </Box>
  );
};

export default MainSection;
