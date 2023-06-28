import dotenv from 'dotenv';
import express from "express";
import mustache from 'mustache-express';
import path from "path";
import mainRoutes from './routes/index';

import { umAno } from './Controllers/pageController';

dotenv.config()

const server = express()

server.use(express.static(path.join(__dirname, '../public')));
server.use('/favicon.ico', express.static(path.join(__dirname, '../favicon.ico')));

server.set('view engine', 'mustache');
server.set('views', path.join(__dirname, 'views'));
server.engine('mustache', mustache());

server.use(mainRoutes);

server.use((req, res)=>{
  res.render('pages/error404')
})

server.listen(process.env.PORT, ()=>{
  console.log('Servidor rodando')
})

