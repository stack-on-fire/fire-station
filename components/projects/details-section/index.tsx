import React from "react";
import {
  Box,
  HStack,
  Divider,
  Button,
  Switch,
  IconButton,
  Tooltip,
  Input,
  Textarea,
  Alert,
  AlertIcon,
  Fade,
  useColorModeValue,
  Spinner,
  Heading,
  Text,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  Icon,
  Flex,
  SimpleGrid,
  TabList,
} from "@chakra-ui/react";

import { useEndpointMutation } from "hooks";

import { useRouter } from "next/dist/client/router";
import { ArrowBackIcon, EditIcon, SettingsIcon } from "@chakra-ui/icons";
import { truncate } from "lodash";

import { HiArchive } from "react-icons/hi";

const DetailsSection = ({
  selectedEndpoint,
  project,
  setName,
  isEditingEndpoint,
  setEditingEndpoint,
  setSelectedEndpoint,
  usedEndpoints,
  name,
  description,
  setDescription,
}) => {
  const router = useRouter();

  const endpointMutation = useEndpointMutation();
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <>
      <div>
        {selectedEndpoint ? (
          <Box>
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
              <Heading fontSize="xl">{selectedEndpoint.name}</Heading>
              {selectedEndpoint.isArchived && (
                <Tooltip label="This endpoint is archived">
                  <Fade in={selectedEndpoint.isArchived}>
                    <Icon
                      position="relative"
                      left={-2}
                      top={-0.5}
                      as={HiArchive}
                      color="gray.500"
                    />
                  </Fade>
                </Tooltip>
              )}
            </HStack>
            <Tabs variant="enclosed">
              <TabList mb="1em">
                <Tab>Main</Tab>
                <Tab>Settings</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <HStack mb={2}>
                    {isEditingEndpoint ? (
                      <Input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        size="sm"
                      />
                    ) : (
                      <Heading fontSize="xl">{selectedEndpoint.name}</Heading>
                    )}
                    {isEditingEndpoint ? (
                      <Button
                        onClick={() => {
                          endpointMutation.mutate({
                            id: selectedEndpoint.id,
                            name,
                            description,
                          });
                          setEditingEndpoint(false);
                        }}
                      >
                        Save
                      </Button>
                    ) : (
                      <IconButton
                        onClick={() => setEditingEndpoint(!isEditingEndpoint)}
                        size="sm"
                        aria-label="Edit"
                        icon={<EditIcon />}
                      />
                    )}
                  </HStack>
                  {isEditingEndpoint ? (
                    <Textarea
                      onChange={(e) => setDescription(e.target.value)}
                      size="sm"
                      value={description}
                    />
                  ) : (
                    <Text mb={4} minW={350}>
                      {selectedEndpoint.description}
                    </Text>
                  )}
                  <Divider mb={4} />
                </TabPanel>

                <TabPanel>
                  <HStack mb={2}>
                    <Heading mb={2} fontSize="lg">
                      Archive endpoint
                    </Heading>
                    <Switch
                      onChange={() =>
                        endpointMutation.mutate({
                          id: selectedEndpoint.id,
                        })
                      }
                      isChecked={selectedEndpoint.isArchived}
                      colorScheme="green"
                      size="md"
                    />
                    {endpointMutation.isLoading && (
                      <Spinner color="gray" ml={1} size="xs" />
                    )}
                  </HStack>
                  <Alert status="warning">
                    <AlertIcon />
                    Archiving the endpoint will automatically turn it off for
                    all the projects where it is used.
                  </Alert>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        ) : (
          <SimpleGrid gridGap={2} columns={[1, 2, 3]}>
            {usedEndpoints?.map((endpoint) => {
              return (
                <Flex
                  key={endpoint.id}
                  alignItems="center"
                  justifyContent="space-between"
                  p={4}
                  border="1px solid"
                  borderColor={borderColor}
                >
                  <HStack>
                    <IconButton
                      onClick={() => setSelectedEndpoint(endpoint)}
                      size="xs"
                      aria-label="Settings"
                      icon={<SettingsIcon />}
                    />

                    <Tooltip
                      isDisabled={endpoint.name.length < 25}
                      placement="top"
                      hasArrow
                      label={endpoint.name}
                      aria-label="endpoint name tooltip"
                    >
                      <Text
                        onClick={() => setSelectedEndpoint(endpoint)}
                        px={1}
                        color={textColor}
                        _hover={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        {truncate(endpoint.name, { length: 25 })}
                      </Text>
                    </Tooltip>
                  </HStack>
                </Flex>
              );
            })}
          </SimpleGrid>
        )}
      </div>
    </>
  );
};

export default DetailsSection;
