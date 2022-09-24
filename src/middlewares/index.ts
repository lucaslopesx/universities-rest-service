import { Prisma, PrismaClient, universities } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

export const router = Router();
const prisma = new PrismaClient();

export async function verifyIfUniversityAlreadyExists(req: Request, res: Response, next: NextFunction){
  let universities = <universities>{};
  universities = req.body as universities;
  
  try{
    const university = await prisma.universities.findFirst({
      where: {
        country: universities.country,
        state_province: universities.state_province,
        name: universities.name
      }
    })
  
    if(university){
      return res.status(400).json({ error: "University already exists"})
    }
  
    return next()
  }catch(error){
    if(error instanceof Prisma.PrismaClientValidationError){
      res.status(500).json({error: error.message})
    }
  }
}

export function checkRequiredFields(req: Request, res: Response, next: NextFunction){
  const { alpha_two_code, web_pages, name, country, domains } = req.body as universities;

  if(alpha_two_code === undefined
    || web_pages === undefined
    || name === undefined
    || country === undefined
    || domains === undefined 
  ){
    return res.status(400).json({ error: "Missing required fields"})
  }

  return next();
}

export async function verifyUniversityExistanceById(req: Request, res: Response, next: NextFunction){
  const { id } = req.params
  try{

    const university = await prisma.universities.findUnique({
      where: {
        id: id
      }
    })
    
    if(!university){
      return res.status(404).json({error: `University with given id:${id} not found`})
    }
    
    return next()
  }catch(error){
    if(error instanceof Prisma.PrismaClientKnownRequestError){
      if(error.code === 'P2023' ){
        return res.status(500).json(error.meta)
      }
    }
    return res.status(500)
  }
}