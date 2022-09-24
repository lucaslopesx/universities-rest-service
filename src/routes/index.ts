import { Request, Response, Router } from "express";
import { Prisma, PrismaClient, universities } from '@prisma/client'
import { verifyIfUniversityAlreadyExists } from "../middlewares";

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
  res.status(200).json(universities)
})


router.get('/universities/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const universities = await prisma.universities.findUnique({
    where: {
      id: id as string
    }
  })
  res.status(200).json(universities)
})


router.post('/universities', verifyIfUniversityAlreadyExists, async (req: Request, res: Response, next) => {
  const { alpha_two_code, web_pages, name, country, domains, state_province } = req.body as universities;

  if(alpha_two_code.length != 2){
    return res.status(400).json({error: "alpha_two_code must have 2 letters"})
  }

  try{
    const newUniversity = await prisma.universities.create({
      data: {
        alpha_two_code,
        web_pages,
        name,
        country,
        domains,
        state_province
      },
    })
    res.status(201).json(newUniversity)
  }catch(error){
    if(error instanceof Prisma.PrismaClientValidationError){
      res.status(500).json({error: error.cause})
    }
  }
})

router.put('/universities/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const { web_pages, name, domains } = req.body as universities

  const university = await prisma.universities.findUnique({
    where: {
      id: id
    }
  })

  if(!university){
    return res.status(404).json({error: `University with given id:${id} not found`})
  }

  try{
    const updatedUniversity = await prisma.universities.update({
      data: {
        web_pages: web_pages,
        name: name,
        domains: domains
      },
      where: {
        id: id
      }
    })

    res.status(200).json(updatedUniversity)
  }catch(error){
    if(error instanceof Prisma.PrismaClientValidationError){
      res.status(500).json({error: error.message})
    }
  }
})

router.delete('/universities/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  const university = await prisma.universities.findUnique({
    where: {
      id: id
    }
  })

  if(!university){
    return res.status(404).json({error: `University with given id:${id} not found`})
  }

  await prisma.universities.delete({
    where: {
      id: id
    }
  })

  res.status(204).send()
})



