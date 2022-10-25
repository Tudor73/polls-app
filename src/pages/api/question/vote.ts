import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/prisma";



export default async function vote(req: NextApiRequest,res: NextApiResponse<any>) {

    if (req.method == "POST") {
        await prisma.vote.create({
            data: {
                optionPicked: req.body.optionPicked,
                questionId: req.body.questionId,
            }
        })
    res.status(200).json({ message: "Vote submited!" });
    }

}