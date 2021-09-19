import { useAppUrl } from "hooks/useAppUrl";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Event } from "@prisma/client";

type Variables = {
  ids: ReadonlyArray<Event["id"]>;
  markAsRead: boolean;
};

const useUpdateEventsMutation = () => {
  const queryClient = useQueryClient();
  const appUrl = useAppUrl();
  return useMutation(
    async (variables: Variables) => {
      const response = await axios.post(`${appUrl}/api/events/update`, {
        toggleArchive: variables.ids,
        markAsRead: variables.markAsRead,
      });
      return response.data;
    },
    {
      onSuccess: async () => {
        console.log("success");
        await queryClient.refetchQueries(["eventsByProject"]);
      },
    }
  );
};

export { useUpdateEventsMutation };
