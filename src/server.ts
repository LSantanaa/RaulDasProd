import dotenv from 'dotenv';
import express from "express";
import mustache from 'mustache-express';
import path from "path";
import mainRoutes from './routes/index';
import { mongoConnect } from './database/db';
import updateToken from './tasks/updateUserToken';
import updateUserMedia from './tasks/updateUserMedia';

dotenv.config()


async function startServer() {
  await mongoConnect();
  updateToken();
  updateUserMedia();

  const server = express()

  server.use(express.static(path.join(__dirname, '../public')));

  server.set('view engine', 'mustache');
  server.set('views', path.join(__dirname, 'views'));
  server.engine('mustache', mustache());

  server.use(mainRoutes);

  server.use((req, res) => {
    res.status(404).render('pages/error404');
  })

  server.use(( req, res, next) => {
    // console.error(err.stack);
    res.status(500).send('Algo deu errado!');
  });

  server.listen(process.env.PORT || 8080, () => {
    console.log('Servidor rodando')
  })

}

startServer();


