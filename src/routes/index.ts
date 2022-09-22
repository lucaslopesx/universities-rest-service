import { Router } from "express";
import { PrismaClient } from '@prisma/client'

export const router = Router();
const prisma = new PrismaClient();

router.get('/', (req, res) => res.send("inicio - github - readme - etc"))

router.get('/universities', 
  async (req, res) => {
    const universities = await prisma.universities.findMany()
    res.send(universities)
  }
)

