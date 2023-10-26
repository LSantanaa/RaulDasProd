import { Request, Response } from "express";
import dataCardVideo from "../Model/dataCardProjects";
import dataCarousel from "../Model/dataCarousel";
import dataAllProjects from "../Model/dataAllProjects";
import { userMedia } from "../Model/Schema/userMediaSchema";

let pageTitle: string = '';

interface arrayFooterLinks {
  name: string,
  route: string
}

const linksFooter: arrayFooterLinks[] = [
  {
    name: "Home",
    route: "/"
  },
  {
    name: "Sobre",
    route: "/sobre"
  },
  {
    name: "Portifólio",
    route: "/projetos"
  },
  {
    name: "Blog",
    route: "/blog"
  },

]

export const home = async (req: Request, res: Response) => {
  pageTitle = 'Home';

  let filterLinks = linksFooter.filter(link => link.name != pageTitle)

  const publicacoes:any = await userMedia.findOne({ username: "rauldasprod" })
  .populate('data')
  .exec()

  let data = publicacoes.data.slice(0,4)

  res.render('pages/index', {
    dataCardVideo,
    pageTitle,
    filterLinks
  })
}

export const about = (req: Request, res: Response) => {
  pageTitle = 'Sobre';

  const carouselBG = dataCarousel[9].url;
  const images = dataCarousel.slice(0, 8);

  let filterLinks = linksFooter.filter(link => link.name != pageTitle)

  res.render('pages/sobre', {
    pageTitle,
    carouselBG,
    images,
    includeGSAP: true,
    filterLinks
  })
}

export const projects = (req: Request, res: Response) => {
  pageTitle = 'Portifólio';
  let filterLinks = linksFooter.filter(link => link.name != pageTitle)


  res.render('pages/projetos', {
    dataAllProjects,
    pageTitle,
    includeModal: true,
    includeGSAP: true,
    filterLinks
  })
}

export const blog = (req: Request, res: Response) => {
  pageTitle = "Blog";

  let filterLinks = linksFooter.filter(link => link.name != pageTitle)

  res.render('pages/blog', {
    pageTitle,
    filterLinks
  })
}

