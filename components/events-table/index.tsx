import { Event } from ".prisma/client";
import { Box, Heading, ListItem, OrderedList, VStack } from "@chakra-ui/layout";
import { Badge, useColorModeValue } from "@chakra-ui/react";
import { format } from "date-fns";
import { useUpdateEventsMutation } from "hooks";

import React, { useEffect } from "react";
import Table from "./table";

const EventsTable = ({
  events,
  setPage,
  currentPage,
  totalCount,
}: {
  events: ReadonlyArray<Event> | [];
  currentPage: number;
  setPage: (number) => void;
  totalCount: number;
}) => {
  const updateEventsMutation = useUpdateEventsMutation();
  const opacity = useColorModeValue("0.35", "0.75");

  useEffect(() => {
    const markEventsAsRead = () =>
      updateEventsMutation.mutate({
        ids: events
          .filter((event: Event) => !event.isRead)
          .map((event) => event.id),
        markAsRead: true,
      });

    if (events.some((event: Event) => !event.isRead)) {
      setTimeout(() => {
        markEventsAsRead();
      }, 800);
    }
  }, [events]);

  const data = React.useMemo(() => events, [events]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Endpoint",
        accessor: "endpoint.name",
        // eslint-disable-next-line react/display-name
        Cell: ({ cell }) => {
          const color = cell.row.original?.endpoint?.color;

          return (
            <Badge
              css={{
                backgroundColor: color
                  ? `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${opacity})`
                  : "",
              }}
            >
              {cell.value}
            </Badge>
          );
        },
      },
      {
        Header: "Fired on",
        accessor: "createdAt",
        Cell: ({ cell }) => format(new Date(cell.value), "P p"),
      },
      {
        Header: "Meta data",
        accessor: "metaData",
        Cell: ({ cell }) => JSON.stringify(cell.value),
      },
    ],
    [opacity]
  );

  return (
    <Box>
      {data.length > 0 ? (
        <Table
          data={data}
          columns={columns}
          setPage={setPage}
          currentPage={currentPage}
          totalPages={Math.ceil(totalCount / 10)}
        />
      ) : (
        <VStack align="start">
          <Heading size="xl">No events to display</Heading>
          <OrderedList>
            <ListItem>Create new endpoint</ListItem>
            <ListItem>Call the endpoint API</ListItem>
            <ListItem>See events popping up in the table</ListItem>
          </OrderedList>
        </VStack>
      )}
    </Box>
  );
};

export default EventsTable;
