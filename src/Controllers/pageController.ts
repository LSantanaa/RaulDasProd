import { Request, Response } from "express";
import dataCardVideo from "../Model/dataCardProjects";
import dataCarousel from "../Model/dataCarousel";
import dataAllProjects from "../Model/dataAllProjects";
import { IDataUserMedia, UserMedia } from "../Model/Schema/userMediaSchema";
import { getPubliFromCache, savePubliInCache } from "../services/cacheService";
import moment from "moment";
import 'moment/locale/pt-br';
moment.locale('pt-br');


let pageTitle: string = '';

//publicação default
const defaultPubli =  {
  id: 123456789,
  caption: '1 CENA = 4 LOOKS 🎨 \n'+'.\n'+'Esse é o poder que o color grading te dá. Conseguir mexer com todas as sensações que a cena transmite ✨\n'+'.\n'+'Aproveitei para aplicar efeitos sonoros que é uma área que estou dando uma maior atenção ultimamente 🎶'+'.\n'+'#colorgrading #davinciresolve #trip #cinematic',
  media_url:"https://scontent.cdninstagram.com/v/t66.30100-16/10000000_3511953419133101_7103532755543319042_n.mp4?_nc_ht=scontent.cdninstagram.com&_nc_cat=105&_nc_ohc=NsSiDs_Zs7IAX9yC8_A&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAyPY0B25IyQ971wh3EbeacvXUu1M4lp8KfXdBMsoYAgg&oe=653E4721&_nc_sid=10d13b",
  media_type:"VIDEO",
  thumbnail_url:"/images/capaPubliDefault.jpg",
  permalink:"https://www.instagram.com/reel/CxGHMGCuSAK/",
  timestamp: "2023-09-12"
}

const formatPubli = (publi:IDataUserMedia)=>{
  const now = moment();
  const date = publi.timestamp

  const howLong = moment(date).from(now);

  return {
    id: publi.id,
    caption: publi.caption.replace(/\n/g, ' '),
    media_url: publi.media_url,
    media_type: publi.media_type,
    thumbnail_url: publi.thumbnail_url || publi.media_url,
    permalink: publi.permalink,
    timestamp: howLong
  }
}

export const home = async (req: Request, res: Response) => {
  pageTitle = 'Home';
  let dataPubli;
  
  const cachedData = await getPubliFromCache();
  if (cachedData !== undefined) {
    dataPubli = JSON.parse(cachedData as string);
  }
  if(dataPubli === undefined){
    try{
      const publicacoes: any = await UserMedia.findOne({username: 'rauldasprod'}).populate('data').exec();
      dataPubli = publicacoes.data;
      dataPubli.unshift(defaultPubli);
      savePubliInCache(dataPubli);
      console.log('Foi feita uma nova requisição para o banco.')
    }catch(error){
      console.log('Não foi possível acessar o banco de dados', error)
    }
  }else{
   console.log('Armazenamento em cache detectado.')
  }
  
  const finalPubli = await dataPubli.map(formatPubli)

  res.render('pages/index', {
    dataCardVideo,
    pageTitle,
    finalPubli
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

