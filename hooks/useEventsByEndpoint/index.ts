import { Endpoint, Project } from ".prisma/client";
import { useAppUrl } from "hooks/useAppUrl";

import { useQuery } from "react-query";

const fetchEventsByEndpoin = async ({
  appUrl,
  skip,
  take,
  endpointId,
  projectId,
}) => {
  const response = await fetch(
    `${appUrl}/api/events/byEndpoint?endpointId=${endpointId}&projectId=${projectId}&skip=${skip}&take=${take}`
  );
  const json = await response.json();

  return json;
};

const useEventsByEndpoint = ({
  skip,
  take,
  endpointId,
  projectId,
}: {
  skip?: number;
  take: number;
  endpointId: Endpoint["id"];
  projectId: Project["id"];
}) => {
  const appUrl = useAppUrl();
  return useQuery(
    ["eventsByEndpoint", skip, take, endpointId],
    () => fetchEventsByEndpoin({ appUrl, skip, take, endpointId, projectId }),
    { keepPreviousData: true, refetchOnWindowFocus: true }
  );
};

export { useEventsByEndpoint, fetchEventsByEndpoin };
