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