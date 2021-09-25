import { useAppUrl } from "hooks/useAppUrl";
import { useMutation, useQueryClient } from "react-query";
import { Project, Endpoint } from ".prisma/client";
import axios from "axios";

type Variables = {
  projectId: Project["id"];
  name: string;
};

const useCreateDashboardMutation = (setSelectedDashboard) => {
  const queryClient = useQueryClient();
  const appUrl = useAppUrl();
  return useMutation(
    async (variables: Variables) => {
      const response = await axios.post(
        `${appUrl}/api/dashboard/create?projectId=${variables.projectId}`,
        { name: variables.name }
      );

      return response.data;
    },
    {
      onSuccess: async (data: Endpoint | undefined) => {
        setSelectedDashboard(data);
        await queryClient.refetchQueries(["projects"]);
      },
      onError: async (error: Error) => {
        console.log(error.message);
      },
    }
  );
};

export { useCreateDashboardMutation };
