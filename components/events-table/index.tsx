import { Event } from ".prisma/client";
import { Box, HStack } from "@chakra-ui/layout";
import { Badge, Button } from "@chakra-ui/react";
import { format } from "date-fns";
import { useCreateEventMutation, useUpdateEventsMutation } from "hooks";

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

  useEffect(() => {
    const markEventsAsRead = () =>
      updateEventsMutation.mutate({
        ids: events.filter((event) => !event.isRead).map((event) => event.id),
        markAsRead: true,
      });

    if (events.some((event) => !event.isRead)) {
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
                  ? `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},0.4)`
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
    []
  );
  const sendEventMutation = useCreateEventMutation();

  return (
    <Box>
      <HStack>
        <Button
          my={2}
          onClick={() =>
            sendEventMutation.mutate({ endpoint: "new-user-registration" })
          }
        >
          register user
        </Button>
        <Button
          my={2}
          onClick={() => sendEventMutation.mutate({ endpoint: "email-signup" })}
        >
          subscribe to email
        </Button>
        <Button
          my={2}
          onClick={() =>
            sendEventMutation.mutate({
              endpoint: "payment",
              metaData: { c: 1, y: 42 },
            })
          }
        >
          pay for service
        </Button>
      </HStack>

      <Table
        data={data}
        columns={columns}
        setPage={setPage}
        currentPage={currentPage}
        totalPages={Math.ceil(totalCount / 10)}
      />
    </Box>
  );
};

export default EventsTable;
