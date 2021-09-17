import { Box } from "@chakra-ui/layout";
import EventsTable from "components/events-table";
import React from "react";

const MainSection = () => {
  return (
    <Box>
      <EventsTable events={[]} />
    </Box>
  );
};

export default MainSection;
