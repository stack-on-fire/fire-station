import prisma from "lib/prisma";
import { sessionMock } from "mocks/handlers";
import { getSession } from "next-auth/client";

export default async function handle(req, res) {
  const session =
    (await getSession({ req })) ||
    (process.env.NODE_ENV === "development" && sessionMock);

  const { endpointId, projectId, skip, take } = req.query;

  const projectsByUser = await prisma.project.findMany({
    where: {
      userId: String(session.user.id),
    },
  });

  if (!projectsByUser.some((project) => project.id === projectId)) {
    throw new Error("No access to the events of this endpoint");
  }

  const events = await prisma.event.findMany({
    where: {
      endpointId,
    },
    include: {
      endpoint: true,
    },
    skip: Number(skip),
    take: Number(take),
    orderBy: {
      createdAt: "desc",
    },
  });
  const eventsTotalCount = await prisma.event.aggregate({
    where: {
      endpointId,
    },
    _count: true,
  });

  res.json({ events, totalCount: eventsTotalCount });
}
