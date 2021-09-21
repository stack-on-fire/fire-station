import { useAppUrl } from "hooks/useAppUrl";
import { useMutation, useQueryClient } from "react-query";
import { Endpoint, Dashboard } from ".prisma/client";
import axios from "axios";

type Variables = {
  dashboardId: Dashboard["id"];
  endpointId: Endpoint["id"];
  widgetType: "SIMPLE_COUNT";
  name: string;
};

const useCreateWidgetMutation = () => {
  const queryClient = useQueryClient();
  const appUrl = useAppUrl();
  return useMutation(
    async (variables: Variables) => {
      const response = await axios.post(
        `${appUrl}/api/widget/create?dashboardId=${variables.dashboardId}&endpointId=${variables.endpointId}&widgetType=${variables.widgetType}&name=${variables.name}`
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

export { useCreateWidgetMutation };
