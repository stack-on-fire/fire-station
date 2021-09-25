import EventsTable from "components/events-table";
import { useEventsByEndpoint } from "hooks/useEventsByEndpoint";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";

const EndpointMainSection = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { endpoint: endpointId, id: projectId } = router.query;

  const { data: events, isLoading } = useEventsByEndpoint({
    endpointId: endpointId as string,
    projectId: projectId as string,
    take: 10,
    skip: page === 1 ? 0 : (page - 1) * 10,
  });

  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      {events ? (
        <EventsTable
          events={events.events}
          totalCount={events.totalCount._count}
          setPage={setPage}
          currentPage={page}
        />
      ) : null}
    </div>
  );
};

export default EndpointMainSection;
