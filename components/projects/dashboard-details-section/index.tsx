import React from "react";

import { ArrowBackIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/layout";
import {
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
  Select,
} from "@chakra-ui/react";
import { Button, IconButton } from "@chakra-ui/button";
import { useRouter } from "next/dist/client/router";
import { Project, Dashboard, Endpoint } from "prisma/prisma-client";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Tooltip } from "@chakra-ui/tooltip";
import { truncate } from "lodash";
import AddWidget from "./add-widget";
import { Widget } from "@prisma/client";
import WidgetComponent from "./widget/widget";

const DashboardDetailsSection = ({
  project,
  selectedDashboard,
  setSelectedDashboard,
}: {
  project: Project & {
    endpoints: ReadonlyArray<Endpoint>;
    dashboards: ReadonlyArray<Dashboard>;
  };
  selectedDashboard: Dashboard & { widgets: ReadonlyArray<Widget> };
  setSelectedDashboard: (Dashboard) => void;
}) => {
  const router = useRouter();

  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <div>
      {selectedDashboard ? (
        <>
          {" "}
          <HStack spacing={4} mb={4}>
            <Button
              onClick={() =>
                router.push(
                  {
                    pathname: router.pathname,
                  },
                  `${project.id}`,
                  { shallow: true }
                )
              }
              size="md"
              aria-label="Back arrow"
              leftIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
            <Heading fontSize="xl">{selectedDashboard.name}</Heading>
          </HStack>
          <Tabs variant="enclosed">
            <TabList mb="1em">
              <Tab>Main</Tab>
              <Tab>Settings</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box mb={4}>
                  <AddWidget project={project} dashboard={selectedDashboard} />
                </Box>
                <Flex>
                  <Select mb={4} ml="auto" w={200} justifySelf="flex-end">
                    <option value="today">Today</option>
                    <option value="today">3 days</option>
                    <option value="today">1 week</option>
                    <option value="today">1 month</option>
                    <option value="today">1 year</option>
                  </Select>
                </Flex>
                <SimpleGrid columns={[1, 2, 3, 4]} gridGap={2}>
                  {selectedDashboard?.widgets?.map((widget) => (
                    <WidgetComponent key={widget.id} widget={widget} />
                  ))}
                </SimpleGrid>
              </TabPanel>
              <TabPanel></TabPanel>
            </TabPanels>
          </Tabs>
        </>
      ) : (
        <SimpleGrid gridGap={2} columns={[1, 2, 3]}>
          {project.dashboards?.map((dashboard) => {
            return (
              <Flex
                key={dashboard.id}
                alignItems="center"
                justifyContent="space-between"
                p={4}
                border="1px solid"
                borderColor={borderColor}
              >
                <HStack>
                  <IconButton
                    onClick={() => setSelectedDashboard(dashboard)}
                    size="xs"
                    aria-label="Settings"
                    icon={<SettingsIcon />}
                  />

                  <Tooltip
                    isDisabled={dashboard.name.length < 25}
                    placement="top"
                    hasArrow
                    label={dashboard.name}
                    aria-label="dashboard name tooltip"
                  >
                    <Text
                      onClick={() => setSelectedDashboard(dashboard)}
                      px={1}
                      color={textColor}
                      _hover={{
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      {truncate(dashboard.name, { length: 25 })}
                    </Text>
                  </Tooltip>
                </HStack>
              </Flex>
            );
          })}
        </SimpleGrid>
      )}
    </div>
  );
};

export default DashboardDetailsSection;
