import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import { prisma } from "../../../../prisma/prisma";



export default async function question(req: NextApiRequest,res: NextApiResponse<any>) {

    const router = useRouter();

    const {id} = router.query;
    if (req.method == "GET") {
        const question = await prisma.question.findFirst({
            where: {
                id: String(id)
            }
        } ) 
    res.status(200).json(question);
    }

}