// import prisma from "lib/prisma";
import jwt from "jsonwebtoken";
import prisma from "lib/prisma";

export default async function handle(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader.includes("Bearer")) {
    throw new Error("Not a valid authorization token");
  }

  const token = authHeader.split("Bearer ")[1];

  if (!token) {
    throw new Error("No JWT has been provided");
  }

  const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedJwt) {
    throw new Error("Could not verify JWT");
  }

  const { endpoint } = req.query;

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
      metaData: { a: 1, b: 2 },
    },
  });

  res.json(event);
}
