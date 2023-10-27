import { Request, Response } from "express";
import dataCardVideo from "../Model/dataCardProjects";
import dataCarousel from "../Model/dataCarousel";
import dataAllProjects from "../Model/dataAllProjects";
import { userMedia } from "../Model/Schema/userMediaSchema";
import { getPubliFromCache, savePubliInCache } from "../services/cacheService";

let pageTitle: string = '';

const defaultPubli =  {
  id: 123456789,
  caption: '1 CENA = 4 LOOKS 🎨 \n'+'.\n'+'Esse é o poder que o color grading te dá. Conseguir mexer com todas as sensações que a cena transmite ✨\n'+'.\n'+'Aproveitei para aplicar efeitos sonoros que é uma área que estou dando uma maior atenção ultimamente 🎶'+'.\n'+'#colorgrading #davinciresolve #trip #cinematic',
  media_url:"https://scontent.cdninstagram.com/v/t66.30100-16/10000000_3511953419133101_7103532755543319042_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=105&_nc_ohc=NsSiDs_Zs7IAX-RwTMu&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAfSo8YSUtUvzeBq8wAMriL71qD-iy22sXmGvL6jqnDkg&oe=653BA421&_nc_sid=10d13b",
  media_type:"VIDEO",
  thumbnail_url:"https://scontent.cdninstagram.com/v/t51.2885-15/377872180_125757870594642_1030230128665171004_n.jpg?stp=dst-jpg_e15_fr_p1080x1080&_nc_ht=scontent.cdninstagram.com&_nc_cat=106&_nc_ohc=7G6E--AO-9YAX_0eZ9I&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAkT1ZTjsrNH-37Ve17I9djlsdxevb7d7lpH0E_6cdt6A&oe=653B69FF&_nc_sid=10d13b",
  permalink:"https://www.instagram.com/reel/CxGHMGCuSAK/"
}

export const home = async (req: Request, res: Response) => {
  let dataPubli;
  
  const cachedData = getPubliFromCache();
  if (cachedData !== undefined) {
    dataPubli = JSON.parse(cachedData as string);
  }

  pageTitle = 'Home';

  if(dataPubli === undefined){
    try{
      const publicacoes: any = await userMedia.findOne({username: 'rauldasprod'}).populate('data').exec();
      dataPubli = publicacoes.data;
      dataPubli.push(defaultPubli);
      savePubliInCache(dataPubli);
      console.log('Foi feita uma nova requisição para o banco.')
    }catch(error){
      console.log('Não foi possível acessar o banco de dados', error)
    }
  }else{
   console.log('Armazenamento em cache detectado.')
  }
  
  res.render('pages/index', {
    dataCardVideo,
    pageTitle,
    dataPubli
  })
}

export const about = (req: Request, res: Response) => {
  pageTitle = 'Sobre';

  const carouselBG = dataCarousel[9].url;
  const images = dataCarousel.slice(0, 8);

  res.render('pages/sobre', {
    pageTitle,
    carouselBG,
    images,
    includeGSAP: true,
  })
}

export const projects = (req: Request, res: Response) => {
  pageTitle = 'Portifólio'

  res.render('pages/projetos', {
    dataAllProjects,
    pageTitle,
    includeModal: true,
    includeGSAP: true,
  })
}

export const blog = (req: Request, res: Response) => {
  pageTitle = "Blog";

  res.render('pages/blog', {
    pageTitle,
  })
}

