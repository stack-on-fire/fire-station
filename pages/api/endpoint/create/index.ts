import prisma from "lib/prisma";

import { generateSlug } from "random-word-slugs";

export default async function handle(req, res) {
  const { projectId } = req.query;
  const name = generateSlug(3, {
    format: "kebab",
    partsOfSpeech: ["adjective", "adjective", "noun"],
    categories: {
      adjective: ["color", "personality"],
      noun: ["animals"],
    },
  });

  const endpoint = await prisma.endpoint.create({
    data: {
      name,
      Project: {
        connect: {
          id: projectId,
        },
      },
    },
  });

  res.json(endpoint);
}
