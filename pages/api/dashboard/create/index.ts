import prisma from "lib/prisma";

export default async function handle(req, res) {
  const { projectId } = req.query;
  const { name } = req.body;

  const existingDashboard = await prisma.dashboard.findFirst({
    where: {
      name,
    },
  });

  if (existingDashboard) {
    return res.status(500).end();
  }

  const dashboard = await prisma.dashboard.create({
    data: {
      name,
      Project: {
        connect: {
          id: projectId,
        },
      },
    },
  });

  res.json(dashboard);
}
