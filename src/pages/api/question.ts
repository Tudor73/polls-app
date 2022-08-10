import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'


const prisma = new PrismaClient()

export default async function question(req: NextApiRequest, res: NextApiResponse<any>) {
    await prisma.question.create({
        data: {
            description: "What is the meaning of life?",
        }
    })
    res.status(200).json({ message: 'Question created!' })
}








