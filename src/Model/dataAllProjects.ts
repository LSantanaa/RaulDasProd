
type card ={
  id: number,
  url: string,
  embedUrl: string,
  poster: string,
  title: string,
  tag: string
}

const dataAllProjects: card[] = [
  {
    id: 1,
    url: 'https://www.youtube.com/watch?v=nUGEFPotzVA',
    embedUrl: 'https://www.youtube.com/embed/FGBaCxTDZaE',
    poster: '/images/sanjaKart.png',
    title: 'Lucas Santiago | Sanja Kart 2023',
    tag: 'curta'
  },
  {
    id: 2,
    url: 'https://youtu.be/nUGEFPotzVA',
    embedUrl: 'https://www.youtube.com/embed/nUGEFPotzVA',
    poster: '/images/coresVivas.png',
    title: 'Cores Vivas | Curta-metragem',
    tag: 'curta'
  },
  {
    id: 3,
    url: 'https://youtu.be/FGBaCxTDZaE',
    embedUrl: 'https://www.youtube.com/embed/FGBaCxTDZaE',
    poster: '/images/aviaoDePapel.png',
    title: 'Avião de Papel | Curta-metragem',
    tag: 'curta'
  },
  {
    id: 4,
    url: 'https://youtu.be/FlhLlUQozL0',
    embedUrl: 'https://www.youtube.com/embed/FlhLlUQozL0',
    poster: '/images/prefacios__vagas__memorias.png',
    title: 'Prefácios - Vagas Memórias | Curta-metragem',
    tag: 'curta'
  },
  {
    id: 5,
    url: 'https://youtu.be/lJxNkmwuveU',
    embedUrl: 'https://www.youtube.com/embed/lJxNkmwuveU',
    poster: '/images/prefacios__chuva__vira.png',
    title: 'Prefácios - E mais uma chuva virá | Curta-metragem',
    tag: 'curta'
  },
  {
    id: 6,
    url: 'https://youtu.be/axyqmnTyHUA',
    embedUrl: 'https://www.youtube.com/embed/axyqmnTyHUA',
    poster: '/images/projeto__cultural.png',
    title: 'Mini Documentário  Projeto Cultural',
    tag: 'documentario'
  },
  {
    id: 7,
    url: 'https://youtu.be/wfqgsClPQLI',
    embedUrl: 'https://www.youtube.com/embed/wfqgsClPQLI',
    poster: '/images/phd__barber.png',
    title: "PHD's BarberClub Video Promo",
    tag: 'comercial'
  },
  

  
]

export default dataAllProjects;