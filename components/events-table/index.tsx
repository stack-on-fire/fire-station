import { Event } from ".prisma/client";
import { Box } from "@chakra-ui/layout";
import { format } from "date-fns";

import React from "react";
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
  const data = React.useMemo(() => events, [events]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Endpoint",
        accessor: "endpoint.name",
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

  return (
    <Box>
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
