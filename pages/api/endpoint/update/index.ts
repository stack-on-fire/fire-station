import prisma from "lib/prisma";

export default async function handle(req, res) {
  const { id } = req.query;
  const { name, description, color } = req.body;

  const endpoint = await prisma.endpoint.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      color,
    },
  });

  res.json(endpoint);
}
