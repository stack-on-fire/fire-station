import { subDays, subMonths, subYears } from "date-fns";
import { Date as DateType } from "hooks/useWidget";
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

  const { id, date }: { id: string; date: DateType["range"] } = req.query;

  const mapDateRangeToDate = (date) => {
    switch (date) {
      case "TODAY":
        return subDays(new Date(), 1);
      case "THREE_DAYS":
        return subDays(new Date(), 3);
      case "ONE_WEEK":
        return subDays(new Date(), 7);
      case "ONE_MONTH":
        return subMonths(new Date(), 1);
      case "ONE_YEAR":
        return subYears(new Date(), 1);
    }
  };

  const eventsTotalCount = await prisma.event.aggregate({
    where: {
      endpointId: id,
      createdAt: {
        gte: mapDateRangeToDate(date),
        lte: new Date(),
      },
    },
    _count: true,
  });

  res.json(eventsTotalCount);
}
