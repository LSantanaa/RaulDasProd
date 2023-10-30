import fs from 'fs'

interface Video{
  id: Number;
  url: String;
  embedUrl: String;
  poster: String;
  altPoster: String;
  title: String;
  tag: String;
}

interface Sections{
  tagTitle: String;
  videos: Video[];
}

interface DataAllProjects{
  sections: Sections[]
}


 const dataAllProjects: DataAllProjects = {
  sections: [
    {
      tagTitle: 'Curtas-metragem',
      videos:[
        {
          id: 1,
          url: 'https://youtu.be/nUGEFPotzVA',
          embedUrl: 'https://www.youtube.com/embed/nUGEFPotzVA',
          poster: 'https://res.cloudinary.com/dn7vmnw2j/image/upload/f_auto/coverProjects/coresVivas.jpg',
          altPoster: 'Capa do vídeo - Moça sorrindo deitada e título em cor degradê',
          title: 'Cores Vivas',
          tag: 'curta'
        },
        {
          id: 2,
          url: 'https://youtu.be/FGBaCxTDZaE',
          embedUrl: 'https://www.youtube.com/embed/FGBaCxTDZaE',
          poster: 'https://res.cloudinary.com/dn7vmnw2j/image/upload/f_auto/coverProjects/aviaoDePapel.jpg',
          altPoster: 'Capa do vídeo - Jovem segurando um avião de papel',
          title: 'Avião de Papel',
          tag: 'curta'
        },
        {
          id: 3,
          url: 'https://youtu.be/FlhLlUQozL0',
          embedUrl: 'https://www.youtube.com/embed/FlhLlUQozL0',
          poster: 'https://res.cloudinary.com/dn7vmnw2j/image/upload/f_auto/coverProjects/vagas__memorias.jpg',
          altPoster: 'Capa do vídeo - homem sentado a mesa com uma xícara de café',
          title: 'Vagas Memórias',
          tag: 'curta'
        },
        {
          id: 4,
          url: 'https://youtu.be/lJxNkmwuveU',
          embedUrl: 'https://www.youtube.com/embed/lJxNkmwuveU',
          poster: 'https://res.cloudinary.com/dn7vmnw2j/image/upload/f_auto/coverProjects/chuva__vira.jpg',
          altPoster: 'Capa do vídeo - Homem de lado pensativo',
          title: 'E mais uma chuva virá',
          tag: 'curta'
        },
        {
          id: 5,
          url: 'https://youtu.be/FRa2ZdbzKYY',
          embedUrl: 'https://www.youtube.com/embed/FRa2ZdbzKYY',
          poster: 'https://res.cloudinary.com/dn7vmnw2j/image/upload/f_auto/coverProjects/as__reliquias.jpg',
          altPoster: 'Capa do Vídeo - Titulo as reliquias',
          title: 'As Relíquias',
          tag: 'curta'
        }

      ]
    },
    {
      tagTitle: 'Videos Comerciais',
      videos:[
        {
          id: 1,
          url: 'https://youtu.be/EZtInWOHkkQ',
          embedUrl: 'https://www.youtube.com/embed/EZtInWOHkkQ',
          poster: 'https://res.cloudinary.com/dn7vmnw2j/image/upload/f_auto/coverProjects/sanjaKart.jpg',
          altPoster: 'Capa do Vídeo - Homem em um Kart de corrida',
          title: 'Sanja Kart',
          tag: 'comercial'
        },
        {
          id: 2,
          url: 'https://youtu.be/wfqgsClPQLI',
          embedUrl: 'https://www.youtube.com/embed/wfqgsClPQLI',
          poster: 'https://res.cloudinary.com/dn7vmnw2j/image/upload/f_auto/coverProjects/phd__barber.jpg',
          altPoster:'Capa do vídeo - Logo da Barbearia',
          title: "PHD's BarberClub",
          tag: 'comercial'
        },
        {
          id: 3,
          url: 'https://youtube.com/shorts/8D7zqBczyAk?feature=share',
          embedUrl: 'https://www.youtube.com/embed/8D7zqBczyAk',
          poster: 'https://res.cloudinary.com/dn7vmnw2j/image/upload/f_auto/coverProjects/gran__cafe.jpg',
          altPoster: 'Capa do Vídeo - um croissant recheado',
          title: 'Gran Café Olympo',
          tag: 'comercial'
        },
      ]
    },
    {
      tagTitle: 'Videoclipes',
      videos:[
        {
          id: 1,
          url: 'https://youtu.be/Mg-IjCL2dAM',
          embedUrl: 'https://www.youtube.com/embed/Mg-IjCL2dAM',
          poster: 'https://res.cloudinary.com/dn7vmnw2j/image/upload/f_auto/coverProjects/drip__mob__vicio.jpg',
          altPoster: 'Capa do Vídeo - 3 jovens que fizeram o a música',
          title: 'Drip Mob - Vício',
          tag: 'videoclipe'
        },
        {
          id: 2,
          url: 'https://youtu.be/3x6PoBVk90U',
          embedUrl: 'https://www.youtube.com/embed/3x6PoBVk90U',
          poster: 'https://res.cloudinary.com/dn7vmnw2j/image/upload/f_auto/coverProjects/kolin__o__retorno.jpg',
          altPoster: 'Capa do Vídeo - Kolin Mc cantando',
          title: 'Kolin MC - O Retorno',
          tag: 'videoclipe'
        },
        {
          id: 3,
          url: 'https://youtu.be/ENiFLYxM_Hw',
          embedUrl: 'https://www.youtube.com/embed/ENiFLYxM_Hw',
          poster: 'https://res.cloudinary.com/dn7vmnw2j/image/upload/f_auto/coverProjects/vka__gravidade__zero.jpg',
          altPoster: 'Capa do Vídeo - Foto do artista',
          title: 'VKA - Gravidade Zero',
          tag: 'videoclipe'
        },
        {
          id: 4,
          url: 'https://youtu.be/vCspOaFWC4o',
          embedUrl: 'https://www.youtube.com/embed/vCspOaFWC4o',
          poster: 'https://res.cloudinary.com/dn7vmnw2j/image/upload/f_auto/coverProjects/kolin__vingador.jpg',
          altPoster: 'Capa do Vídeo - Kolin MC Sorrindo',
          title: 'Kolin MC - Vingador',
          tag: 'videoclipe'
        },
        {
          id: 5,
          url: 'https://youtu.be/rDXO-KhpFHY',
          embedUrl: 'https://www.youtube.com/embed/rDXO-KhpFHY',
          poster: 'https://res.cloudinary.com/dn7vmnw2j/image/upload/f_auto/coverProjects/kolin__assalto__relampago.jpg',
          altPoster: 'Capa do Vídeo - Homem sendo rendido',
          title: 'Kolin MC - Assalto Relâmpago',
          tag: 'videoclipe'
        },
        {
          id: 6,
          url: 'https://youtu.be/znR-Et46fhs',
          embedUrl: 'https://www.youtube.com/embed/znR-Et46fhs',
          poster: 'https://res.cloudinary.com/dn7vmnw2j/image/upload/f_auto/coverProjects/kolin__rap__vive.jpg',
          altPoster: 'Capa do Vídeo - Homem em um Kart de corrida',
          title: 'Kolin MC - Rap Vive',
          tag: 'videoclipe'
        },
        {
          id: 7,
          url: 'https://youtu.be/yeOZclF1gpA',
          embedUrl: 'https://www.youtube.com/embed/yeOZclF1gpA',
          poster: 'https://res.cloudinary.com/dn7vmnw2j/image/upload/f_auto/coverProjects/kolin__morena.jpg',
          altPoster: 'Capa do Vídeo - Os 3 artistas presentes na música sentados',
          title: 'Kolin MC - Morena',
          tag: 'videoclipe'
        },
        {
          id: 8,
          url: 'https://youtu.be/sqqiyCOf44Q',
          embedUrl: 'https://www.youtube.com/embed/sqqiyCOf44Q',
          poster: 'https://res.cloudinary.com/dn7vmnw2j/image/upload/f_auto/coverProjects/kolin__cartas__na__manga.jpg',
          altPoster: 'Capa do Vídeo - Kolin MC segurando uma carta',
          title: 'Kolin MC - Cartas Na Manga',
          tag: 'videoclipe'
        },
        {
          id: 9,
          url: 'https://youtu.be/cRz5PXw0_hc',
          embedUrl: 'https://www.youtube.com/embed/cRz5PXw0_hc',
          poster: 'https://res.cloudinary.com/dn7vmnw2j/image/upload/f_auto/coverProjects/kolin__poetas__no__terreo.jpg',
          altPoster: 'Capa do Vídeo - Kolin MC e feat.',
          title: 'Kolin MC - Poetas No Terreo',
          tag: 'videoclipe'
        },
      ]
    }
  ]
};

export default dataAllProjects;