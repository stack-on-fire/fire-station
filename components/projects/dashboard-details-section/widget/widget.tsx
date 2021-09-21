import { Widget } from ".prisma/client";
import { Stat } from "components/simple-stat";
import { StatLabel } from "components/simple-stat/stat-label";
import { StatNumber } from "components/simple-stat/stat-number";
import { useWidget } from "hooks/useWidget";

import React from "react";

const WidgetComponent = ({ widget }: { widget: Widget }) => {
  const { data } = useWidget({ id: widget.endpointId });

  return (
    <Stat key={widget.name}>
      <StatLabel>{widget.name}</StatLabel>
      <StatNumber>{data?._count}</StatNumber>
    </Stat>
  );
};

export default WidgetComponent;
