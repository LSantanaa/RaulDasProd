import { Request, Response } from "express";
import axios from 'axios';
import querystring from 'querystring';
import dotenv from 'dotenv';
import { getUserData, saveUserDataToDatabase, saveUserTokenToDatabase } from "../services/instaService";

dotenv.config();

const getShortAccesToken = async (code: string) => {
  return await axios.post(
    'https://api.instagram.com/oauth/access_token',
    querystring.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: process.env.REDIRECT_URI,
      code,
    })
  );
}

const getLongAccessToken = async (accessToken: string) => {
  return axios.get('https://graph.instagram.com/access_token', {
    params: {
      grant_type: 'ig_exchange_token',
      client_secret: process.env.CLIENT_SECRET,
      access_token: accessToken
    }
  });
};

//ao acessar a rota valida_insta redireciona para receber a permissão do usuário
export const authInsta = (req: Request, res: Response) => {
  res.redirect(`https://api.instagram.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=user_profile,user_media&response_type=code`)
}

//se a confirmação for feita, o código de acesso é enviado via parametro na url da rota /auth, com o código faço a requisição de um token curto e troco por um token de longo acesso
export const getAccessToken = async (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Código de autorização ausente.');
  }

  try {
    const shortTokenResponse = await getShortAccesToken(code.toString());
    const shortToken = shortTokenResponse.data.access_token;

    const longTokenResponse = await getLongAccessToken(shortToken);
    const longAccessToken = longTokenResponse.data;

    const {username, mediaData} = await getUserData(longAccessToken.access_token);

    await saveUserDataToDatabase(username, mediaData);
    await saveUserTokenToDatabase(longAccessToken, username);
    
    res.redirect('/');

  } catch (error) {
    console.error('Erro ao obter token de acesso:', error);
    res.status(500).send('Erro ao obter token de acesso.');
  }
};


