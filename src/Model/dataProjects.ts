import formatText from "../helpers/formatText";

type CardVideo ={
  id: number,
  url: string,
  embedUrl: string,
  poster: string,
  title: string,
  description: string
}

const data: CardVideo[] = [
  {
    id: 1,
    url: 'https://www.youtube.com/watch?v=nUGEFPotzVA',
    embedUrl: 'https://www.youtube.com/embed/FGBaCxTDZaE',
    poster: '/images/sanjaKart.png',
    title: 'Lucas Santiago | Sanja Kart 2023',
    description: formatText('Vídeo comercial produzido pela produtora IlhaCrop Audiovisual para divulgar a imagem do piloto de kart Lucas Santiago. Esse projeto sem dúvidas foi bem desafiador, já que tínhamos duas câmeras, um gimbal e um sonho!')
  },
  {
    id: 2,
    url: 'https://www.youtube.com/watch?v=nUGEFPotzVA',
    embedUrl: 'https://www.youtube.com/embed/nUGEFPotzVA',
    poster: '/images/coresVivas.png',
    title: 'Cores Vivas | Curta-metragem',
    description: formatText('Este é o mais novo curta-metragem desenvolvido pela produtora IlhaCrop. Nele pudemos explorar mais da estética cinematográfica, onde utilizamos novas técnicas na produção e pós produção. Confere aí!')
  },
  {
    id: 3,
    url: 'https://www.youtube.com/watch?v=FGBaCxTDZaE&t',
    embedUrl: 'https://www.youtube.com/embed/FGBaCxTDZaE',
    poster: '/images/aviaoDePapel.png',
    title: 'Avião de Papel | Curta-metragem',
    description: formatText('Mais um projeto desenvolvido pela IlhaCrop, nós fizemos este projeto como um trabalho de conclusão de curso (TCC) e o resultado foi além do esperado. Recentemente foi premiado no 2° Festival Escola de Cinema com “Melhor Filme Júri Popular”.')
  },
]

export default data;