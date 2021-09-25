import { Widget } from ".prisma/client";
import { IconButton } from "@chakra-ui/button";
import { CloseIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import { Stat } from "components/simple-stat";
import { StatLabel } from "components/simple-stat/stat-label";
import { StatNumber } from "components/simple-stat/stat-number";
import { useDeleteWidgetMutation } from "hooks";
import { Date, useWidget } from "hooks/useWidget";

import React from "react";

const WidgetComponent = ({
  widget,
  date,
}: {
  widget: Widget;
  date: Date["range"];
}) => {
  const { data } = useWidget({ id: widget.endpointId, date });
  const deleteWidgetMutation = useDeleteWidgetMutation();

  return (
    <Stat key={widget.name}>
      <Flex justifyContent="space-between">
        <StatLabel>{widget.name}</StatLabel>
        <IconButton
          onClick={() => deleteWidgetMutation.mutate({ id: widget.id })}
          size="xs"
          aria-label="blah"
          icon={<CloseIcon />}
        />
      </Flex>
      <StatNumber>{data?._count}</StatNumber>
    </Stat>
  );
};

export default WidgetComponent;
