import prisma from "lib/prisma";
import jwt from "jsonwebtoken";

export default async function handle(req, res) {
  const { projectId } = req.query;
  const token = jwt.sign(
    {
      data: {
        projectId,
      },
    },
    process.env.JWT_SECRET
  );

  const project = await prisma.accessToken.create({
    data: {
      jwt: token,
      projectId,
    },
  });
  res.json(project);
}
