import { Request, Response } from "express";
import dataCardVideo from "../Model/dataCardProjects";
import dataCarousel from "../Model/dataCarousel";
import  dataAllProjects  from "../Model/dataAllProjects";

let pageTitle:string = '';
let footerFirstLink:string = '/';
let footerFirstLinkName:string = 'Home';

export const home = (req: Request, res: Response) =>{
  footerFirstLink = '/sobre';
  footerFirstLinkName = 'Sobre'
  pageTitle = 'Home';

  // res.set('Cache-Control',`public, max-age=${umAno}`)

  res.render('pages/index', {
    dataCardVideo,
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

  res.render('pages/projetos', {
    dataAllProjects,
    pageTitle, 
    footerFirstLink, 
    footerFirstLinkName,
    includeModal:true,
    includeGSAP: true
  })
}

export const blog = (req: Request, res: Response) =>{
  res.render('pages/blog')
}