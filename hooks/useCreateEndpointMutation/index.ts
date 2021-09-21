import { useAppUrl } from "hooks/useAppUrl";
import { useMutation, useQueryClient } from "react-query";
import { Project, Endpoint } from ".prisma/client";

type Variables = {
  projectId: Project["id"];
};

const useCreateEndpointMutation = (setSelectedEndpoint) => {
  const queryClient = useQueryClient();
  const appUrl = useAppUrl();
  return useMutation(
    async (variables: Variables) => {
      const result = await fetch(
        `${appUrl}/api/endpoint/create?projectId=${variables.projectId}`
      );
      const json = await result.json();
      return json;
    },
    {
      onSuccess: async (data: Endpoint | undefined) => {
        setSelectedEndpoint(data);
        await queryClient.refetchQueries(["projects"]);
      },
    }
  );
};

export { useCreateEndpointMutation };
