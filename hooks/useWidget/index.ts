import { Endpoint } from "@prisma/client";
import axios from "axios";
import { useAppUrl } from "hooks/useAppUrl";

import { useQuery } from "react-query";

export type Date = {
  range: "TODAY" | "THREE_DAYS" | "ONE_MONTH" | "ONE_YEAR";
};

const fetchWidget = async (appUrl, id, date: Date["range"]) => {
  const response = await axios.get(
    `${appUrl}/api/widget/?id=${id}&date=${date}`
  );

  return response.data;
};

const useWidget = ({
  id,
  date,
}: {
  id: Endpoint["id"];
  date: Date["range"];
}) => {
  const appUrl = useAppUrl();
  return useQuery(["widget", id, date], () => fetchWidget(appUrl, id, date));
};

export { useWidget, fetchWidget };
