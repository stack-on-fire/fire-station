import prisma from "lib/prisma";

export default async function handle(req, res) {
  const { id } = req.query;
  const { name } = req.body;

  const project = await prisma.project.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  res.json(project);
}
