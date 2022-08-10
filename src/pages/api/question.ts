import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'


const prisma = new PrismaClient()

export default async function question(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.method === 'POST') {
        await prisma.question.create({
            data: {
                description: req.body,
            }
        })
        res.status(200).json({ message: 'Question created!' })
    }
    else {
        const questions = await prisma.question.findMany()
        res.status(200).json(questions)
    }
}








