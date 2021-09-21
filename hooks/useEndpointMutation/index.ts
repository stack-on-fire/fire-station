import { useAppUrl } from "hooks/useAppUrl";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Endpoint } from ".prisma/client";

type Variables = {
  id: Endpoint["id"];
  name?: string;
  description?: string;
  color?: string;
};

const useEndpointMutation = () => {
  const queryClient = useQueryClient();
  const appUrl = useAppUrl();
  return useMutation(
    async (variables: Variables) => {
      const response = await axios.post(
        `${appUrl}/api/endpoint/update?id=${variables.id}`,
        {
          name: variables.name,
          description: variables.description,
          color: variables.color,
        }
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

export { useEndpointMutation };
