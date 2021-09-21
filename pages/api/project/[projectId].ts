import prisma from "lib/prisma";

export default async function handle(req, res) {
  const project = await prisma.project.findUnique({
    where: {
      id: String(req.query.projectId),
    },
    include: {
      endpoints: true,
      accessTokens: true,
      dashboards: {
        include: {
          widgets: true,
        },
      },
    },
  });

  res.json(project);
}
