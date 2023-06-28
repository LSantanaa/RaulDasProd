import { Request, Response } from "express";
import data from "../Model/dataProjects";
import dataCarousel from "../Model/dataCarousel";

export const umAno:number = 365 * 24 * 60 * 60 * 100;

let pageTitle:string = '';
let footerFirstLink:string = '/';
let footerFirstLinkName:string = 'Home';

export const home = (req: Request, res: Response) =>{
  footerFirstLink = '/sobre';
  footerFirstLinkName = 'Sobre'
  pageTitle = 'Home';

  // res.set('Cache-Control',`public, max-age=${umAno}`)

  res.render('pages/index', {
    data,
    pageTitle,
    footerFirstLink, 
    footerFirstLinkName
  })
}

export const about = (req: Request, res: Response) =>{
  pageTitle = 'Sobre Mim';

  footerFirstLink = '/';
  footerFirstLinkName = 'Home';
  
  const carouselBG = dataCarousel[9].url;

  const images = dataCarousel.slice(0,8);

  res.cookie('_glc_au', req.cookies._glc_au, { sameSite: 'none', secure: true });
  res.cookie('_gaexp', req.cookies._gaexp, { sameSite: 'none', secure: true });
  
  res.render('pages/sobre', {
      pageTitle,
      carouselBG,
      images,
      footerFirstLink,
      footerFirstLinkName
    })
}

export const projects = (req: Request, res: Response) =>{
  pageTitle = 'Portifólio';

  res.render('pages/projetos', {pageTitle, footerFirstLink, footerFirstLinkName})
}

export const blog = (req: Request, res: Response) =>{
  res.render('pages/blog')
}