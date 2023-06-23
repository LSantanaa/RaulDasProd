import { Request, Response } from "express";
import data from "../Model/dataProjects";

export const umAno = 365 * 24 * 60 * 60 * 100;

export const home = (req: Request, res: Response) =>{
  // res.set('Cache-Control',`public, max-age=${umAno}`)
  res.render('pages/index', {data})
}

export const about = (req: Request, res: Response) =>{
  res.render('pages/sobre')
}

export const projects = (req: Request, res: Response) =>{
  res.render('pages/projetos')
}

export const blog = (req: Request, res: Response) =>{
  res.render('pages/blog')
}