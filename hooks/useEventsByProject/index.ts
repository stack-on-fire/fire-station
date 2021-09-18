import { Project } from ".prisma/client";
import { useAppUrl } from "hooks/useAppUrl";

import { useQuery } from "react-query";

const fetchEventsByProject = async ({ appUrl, skip, take, projectId }) => {
  const response = await fetch(
    `${appUrl}/api/events/byProject?projectId=${projectId}&skip=${skip}&take=${take}`
  );
  const json = await response.json();

  return json;
};

const useEventsByProject = ({
  skip,
  take,
  projectId,
}: {
  skip?: number;
  take: number;
  projectId: Project["id"];
}) => {
  const appUrl = useAppUrl();
  return useQuery(
    ["eventsByProject", skip, take, projectId],
    () => fetchEventsByProject({ appUrl, skip, take, projectId }),
    { keepPreviousData: true, refetchOnWindowFocus: true }
  );
};

export { useEventsByProject, fetchEventsByProject };
