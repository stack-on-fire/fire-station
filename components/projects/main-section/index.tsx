import { Project } from ".prisma/client";
import { Box } from "@chakra-ui/layout";
import EventsTable from "components/events-table";
import { useEventsByProject } from "hooks";
import React, { useState } from "react";

const MainSection = ({ projectId }: { projectId: Project["id"] }) => {
  const [page, setPage] = useState(1);

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
