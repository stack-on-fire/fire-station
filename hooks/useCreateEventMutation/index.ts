import { useAppUrl } from "hooks/useAppUrl";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Endpoint } from ".prisma/client";

type Variables = {
  endpoint: Endpoint["name"];
  metaData?: {
    [key: string]: unknown;
  };
};

const useCreateEventMutation = () => {
  const queryClient = useQueryClient();
  const appUrl = useAppUrl();
  return useMutation(
    async (variables: Variables) => {
      const response = await axios.post(
        `${appUrl}/api/event/create?endpoint=${variables.endpoint}`,
        { metaData: variables.metaData },
        {
          headers: {
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InByb2plY3RJZCI6ImNrdG8yYTJtNzAwMDZkYnliNmVpeXdueWkifSwiaWF0IjoxNjMxODY5MDg0fQ.VhL1-V75fH0Vhv1IE8kDwSej4CBBKbk1bVwF8KMLhHY",
          },
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

export { useCreateEventMutation };
