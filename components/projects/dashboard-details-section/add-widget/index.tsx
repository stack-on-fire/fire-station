import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  VStack,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { Project, Endpoint, Dashboard } from "@prisma/client";
import SearchableSelect from "components/searchable-select";
import { useCreateWidgetMutation } from "hooks";

const AddWidget = ({
  project,
  dashboard,
}: {
  project: Project & { endpoints: ReadonlyArray<Endpoint> };
  dashboard: Dashboard;
}) => {
  const endpointOptions = project.endpoints.map((endpoint) => ({
    value: endpoint.id,
    label: endpoint.name,
  }));
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [selectedWidgetType, setSelectedWidgetType] = useState(null);
  const [widgetName, setWidgetName] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const addWidgetMutation = useCreateWidgetMutation();

  return (
    <>
      <Button onClick={onOpen}>Add widget</Button>

      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add widget</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <FormControl>
                <FormLabel fontSize="sm">Name of the widget</FormLabel>
                <Input
                  placeholder="Name of widget e.g. User sign ups"
                  size="sm"
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                />
              </FormControl>
              <SearchableSelect
                label="Select endpoint"
                options={endpointOptions}
                selectedValue={selectedEndpoint}
                setSelectedValue={setSelectedEndpoint}
              />
              <SearchableSelect
                label="Select widget type"
                options={[{ value: "COUNT_SIMPLE", label: "Simple count" }]}
                selectedValue={selectedWidgetType}
                setSelectedValue={setSelectedWidgetType}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                addWidgetMutation.mutate({
                  name: widgetName,
                  dashboardId: dashboard.id,
                  endpointId: selectedEndpoint.value,
                  widgetType: "SIMPLE_COUNT",
                });
                onClose();
                setSelectedEndpoint(null);
                setSelectedWidgetType(null);
                setWidgetName(null);
              }}
            >
              Add widget
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddWidget;
