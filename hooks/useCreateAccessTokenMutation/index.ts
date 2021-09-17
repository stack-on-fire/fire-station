import { useAppUrl } from "hooks/useAppUrl";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Project } from ".prisma/client";

type Variables = {
  projectId: Project["id"];
};

const useCreateAccessTokenMutation = () => {
  const queryClient = useQueryClient();
  const appUrl = useAppUrl();
  return useMutation(
    async (variables: Variables) => {
      const response = await axios.post(
        `${appUrl}/api/token/create?projectId=${variables.projectId}`
      );
      return response.data;
    },
    {
      onSuccess: async () => {
        await queryClient.refetchQueries(["projects"]);
      },
    }
  );
};

export { useCreateAccessTokenMutation };
