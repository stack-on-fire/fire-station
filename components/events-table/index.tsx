import { Event } from ".prisma/client";
import { Box } from "@chakra-ui/layout";
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
        Cell: ({ cell }) => <Badge colorScheme="orange">{cell.value}</Badge>,
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
      <Button
        my={2}
        onClick={() =>
          sendEventMutation.mutate({ endpoint: "new-user-registration" })
        }
      >
        click me
      </Button>
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
