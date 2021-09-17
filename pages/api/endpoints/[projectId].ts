import prisma from "lib/prisma";

const handle = async (req, res) => {
  const { projectId } = req.query;

  const endpoints = await prisma.event.findMany({
    where: {
      projectId: String(projectId),
    },
  });

  res.status(200).json(endpoints);
};

module.exports = handle;
