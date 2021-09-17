import prisma from "lib/prisma";

export default async function handle(req, res) {
  const { id } = req.query;

  const project = await prisma.accessToken.delete({
    where: {
      id,
    },
  });
  res.json(project);
}
