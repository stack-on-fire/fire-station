import prisma from "lib/prisma";

export default async function handle(req, res) {
  const { idList, markAsRead } = req.body;

  if (markAsRead) {
    const project = await prisma.event.updateMany({
      where: {
        id: {
          in: idList,
        },
      },
      data: {
        isRead: new Date(),
      },
    });

    res.json(project);
  }
}
