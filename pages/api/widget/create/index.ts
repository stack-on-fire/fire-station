import prisma from "lib/prisma";

export default async function handle(req, res) {
  const { dashboardId, endpointId, widgetType, name } = req.query;

  const widget = await prisma.widget.create({
    data: {
      name,
      endpointId,
      dashboardId,
      type: widgetType,
    },
  });

  res.json(widget);
}
