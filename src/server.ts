import dotenv from 'dotenv';
import express from "express";
import mustache from 'mustache-express';
import path from "path";
import mainRoutes from './routes/index';
import { mongoConnect } from './database/db';
import updateEveryFiveDays from './tasks/updateUserMedia';

dotenv.config()

mongoConnect();

const server = express()

updateEveryFiveDays();

server.use(express.static(path.join(__dirname, '../public')));

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

