import { Request, Response, Router } from "express";
import { PrismaClient, universities } from '@prisma/client'

export const router = Router();
const prisma = new PrismaClient();

router.get('/', (req, res) => res.send("inicio - github - readme - etc"))

router.get('/universities', async (req: Request, res: Response) => {
  const country: string = req.query.country?.toString() || '';
  const page: number = parseInt(req.query.page as string) || 0;
  const universities = await prisma.universities.findMany({
    take: 20,
    skip: page * 20,
    where: {
      country: {
        contains: country,
        mode: 'insensitive'
      }
    },
    select: {
      id: true,
      name: true,
      country: true,
      state_province: true
    },
  })
  res.send(universities)
})

router.get('/universities/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const universities = await prisma.universities.findUnique({
    where: {
      id: id as string
    }
  })
  res.send(universities)
})

router.post('/universities', async (req: Request, res: Response, next) => {
  const {alpha_two_code, web_pages, name, country, domains, state_province } = req.body as universities;
  if(alpha_two_code.length != 2){
    return next("alpha_two_code must have 2 letters")
  }
  const result = await prisma.universities.create({
    data: {
      alpha_two_code,
      web_pages,
      name,
      country,
      domains,
      state_province
    },
  })
  res.json(result.id)
})


