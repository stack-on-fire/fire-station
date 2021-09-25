import jwt from "jsonwebtoken";
import prisma from "lib/prisma";
import Pusher from "pusher";
export default async function handle(req, res) {
  const pusher = new Pusher({
    appId: "1269318",
    key: "a2f021e5df573a6f52b4",
    secret: process.env.PUSHER_SECRET,
    cluster: "eu",
    useTLS: true,
  });

  const authHeader = req.headers.authorization;
  if (!authHeader.includes("Bearer")) {
    throw new Error("Not a valid authorization token");
  }

  const token = authHeader.split("Bearer ")[1];

  if (!token) {
    throw new Error("No JWT has been provided");
  }
  const foundToken = await prisma.accessToken.findFirst({
    where: {
      jwt: token,
    },
  });

  if (!foundToken) {
    throw new Error("No such token exists for this endpoint");
  }

  const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedJwt) {
    throw new Error("Could not verify JWT");
  }

  const { endpoint } = req.query;
  const { metaData } = req.body;

  const foundEndpoint = await prisma.endpoint.findFirst({
    where: {
      name: endpoint,
    },
  });

  if (!foundEndpoint) {
    throw new Error("No endpoint with this name exists for this token.");
  }

  const event = await prisma.event.create({
    data: {
      endpointId: foundEndpoint.id,
      projectId: foundEndpoint.projectId,
      metaData,
    },
    include: {
      endpoint: true,
    },
  });

  pusher.trigger("fire-station-events", "create-event", {
    event,
  });

  res.json(event);
}
