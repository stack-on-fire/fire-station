import prisma from "lib/prisma";
import { sessionMock } from "mocks/handlers";
import { getSession } from "next-auth/client";

export default async function handle(req, res) {
  const session =
    (await getSession({ req })) ||
    (process.env.NODE_ENV === "development" && sessionMock);

  if (!session) {
    throw new Error("Not authorized");
  }

  const { id } = req.query;

  const eventsTotalCount = await prisma.event.aggregate({
    where: {
      endpointId: id,
    },
    _count: true,
  });

  res.json(eventsTotalCount);
}
