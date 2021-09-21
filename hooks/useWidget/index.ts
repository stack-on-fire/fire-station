import { Endpoint } from "@prisma/client";
import axios from "axios";
import { useAppUrl } from "hooks/useAppUrl";

import { useQuery } from "react-query";

const fetchWidget = async (appUrl, id) => {
  const response = await axios.get(`${appUrl}/api/widget/${id}`);

  return response.data;
};

const useWidget = ({ id }: { id: Endpoint["id"] }) => {
  const appUrl = useAppUrl();
  return useQuery(["projects", id], () => fetchWidget(appUrl, id));
};

export { useWidget, fetchWidget };
