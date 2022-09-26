import { Request, Response, Router } from "express";
import { Prisma, PrismaClient, universities } from '@prisma/client'
import { checkRequiredFields, verifyIfUniversityAlreadyExists, verifyUniversityExistanceById } from "../middlewares";

export const router = Router();
const prisma = new PrismaClient();

router.get('/', (req, res) => res.send("REST API Universities - https://github.com/lucaslopesx/universities-rest-service"))

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
  return res.status(200).json(universities)
})


router.get('/universities/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try{
    const university = await prisma.universities.findUnique({
      where: {
        id: id as string
      }
    })
  
    if(university){
      return res.status(200).json(university)
    }
  
    return res.status(404).json({error: `University with given id:${id} not found`})
  }catch(error){
    if(error instanceof Prisma.PrismaClientKnownRequestError){
      if(error.code === 'P2023' ){
        return res.status(500).json(error.meta)
      }
    }
    return res.status(500)
  }
  
})


router.post('/universities', checkRequiredFields, verifyIfUniversityAlreadyExists, async (req: Request, res: Response, next) => {
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
    return res.status(201).json(newUniversity)
  }catch(error){
    if(error instanceof Prisma.PrismaClientValidationError){
      return res.status(500).json({error: error.message})
    }
    return res.status(500)
  }
})

router.put('/universities/:id', verifyUniversityExistanceById, async (req: Request, res: Response) => {
  const { id } = req.params
  const { web_pages, name, domains } = req.body as universities

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

    return res.status(200).json(updatedUniversity)

  }catch(error){
    if(error instanceof Prisma.PrismaClientValidationError){
      return res.status(500).json({error: error.message})
    }
    if(error instanceof Prisma.PrismaClientKnownRequestError){
      if(error.code === 'P2023' ){
        return res.status(500).json(error.meta)
      }
    }
  }
})

router.delete('/universities/:id', verifyUniversityExistanceById, async (req: Request, res: Response) => {
  const { id } = req.params
  try{    
    await prisma.universities.delete({
      where: {
        id: id
      }
    })
    
    return res.status(204).send()

  }catch(error){
    if(error instanceof Prisma.PrismaClientKnownRequestError){
      if(error.code === 'P2023' ){
        return res.status(500).json(error.meta)
      }
    }
    return res.status(500)
  }
})



