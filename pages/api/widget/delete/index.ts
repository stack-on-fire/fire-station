import prisma from "lib/prisma";

export default async function handle(req, res) {
  const { id } = req.query;

  const widget = await prisma.widget.delete({
    where: {
      id,
    },
  });

  res.json(widget);
}
