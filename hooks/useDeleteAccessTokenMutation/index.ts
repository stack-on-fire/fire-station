import { useAppUrl } from "hooks/useAppUrl";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { AccessToken } from ".prisma/client";

type Variables = {
  id: AccessToken["id"];
};

const useDeleteAccessTokenMutation = () => {
  const queryClient = useQueryClient();
  const appUrl = useAppUrl();
  return useMutation(
    async (variables: Variables) => {
      const response = await axios.post(
        `${appUrl}/api/token/delete?id=${variables.id}`
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

export { useDeleteAccessTokenMutation };
