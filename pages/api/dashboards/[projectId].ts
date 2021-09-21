import prisma from "lib/prisma";

const handle = async (req, res) => {
  const { projectId } = req.query;

  const dashboards = await prisma.dashboard.findMany({
    where: {
      projectId: String(projectId),
    },
  });

  res.status(200).json(dashboards);
};

module.exports = handle;
