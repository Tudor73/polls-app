import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/prisma";

export default async function question(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    await prisma.question.create({
      data: {
        description: req.body.description, 
        options: req.body.options,
        Vote: req.body.votes,
      },
    });
    res.status(200).json({ message: "Question created!" });
  } else {
    const questions = await prisma.question.findMany();
    res.status(200).json(questions);
  }
  
}
