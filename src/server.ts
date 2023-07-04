import dotenv from 'dotenv';
import express from "express";
import mustache from 'mustache-express';
import path from "path";
import mainRoutes from './routes/index';

dotenv.config()

const server = express()

server.use(express.static(path.join(__dirname, '../public')));

server.use('/favicon.ico', express.static(path.join(__dirname, '../favicon.ico')));
server.use('/robots.txt', express.static(path.join(__dirname, '../robots.txt')));
server.use('/sitemap.xml', express.static(path.join(__dirname, '../sitemap.xml')));

server.set('view engine', 'mustache');
server.set('views', path.join(__dirname, 'views'));
server.engine('mustache', mustache());

server.use(mainRoutes);

server.use((req, res)=>{
  res.status(404).render('pages/error404');
})

server.listen(process.env.PORT || 8080, ()=>{
  console.log('Servidor rodando')
})

