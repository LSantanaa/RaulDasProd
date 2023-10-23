import { Request, Response } from "express";
import axios from 'axios';
import querystring from 'querystring';
import dotenv from 'dotenv';
import { TokenModel } from "../Model/Schema/tokenSchema";
import { userMedia } from "../Model/Schema/userMediaSchema";

dotenv.config();

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
    //token curto
    const accessTokenResponse = await axios.post(
      'https://api.instagram.com/oauth/access_token',
      querystring.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: process.env.REDIRECT_URI,
        code: code.toString()
      })
    );
    let accessToken = accessTokenResponse.data.access_token;

    //token longo
    const longAccessTokenResponse = await axios.get('https://graph.instagram.com/access_token', {
      params: {
        grant_type: 'ig_exchange_token',
        client_secret:process.env.CLIENT_SECRET,
        access_token: accessToken
      }
    })
    let longAccessToken = longAccessTokenResponse.data;

    
    const getUserInsta = await axios.get(`https://graph.instagram.com/me?access_token${longAccessToken.access_token}`)
    const getUserMedia = await axios.get(`https://graph.instagram.com/me/media?fields=id,caption,media_url,is_shared_to_feed,media_type,thumbnail_url&access_token=${longAccessToken.access_token}`)
    
    const username = getUserInsta.data.username;
    const data = getUserMedia.data.data
    
    //inserir media no banco
    const newUserMedia = new userMedia({
      username,
      data
    })

    const inserirMedia = await newUserMedia.save();

    //inserir token no banco de dados
    const today = new Date();
    const secondsToExpire = longAccessToken.expires_in;
    const expirationDate = new Date(today.getTime() + secondsToExpire * 1000)
    
    const newToken = new TokenModel({
      user: username,
      longToken: longAccessToken.access_token,
      createdAt: today,
      expiresAt: expirationDate
    })
    const inserirToken = await newToken.save();

    if(inserirMedia && inserirToken){
      res.redirect('/')
    }else{
      res.send('Houve um erro ao salvar os dados, contate o administrador.')
    }
   
  } catch (error) {
    console.error('Erro ao obter token de acesso:', error);
    res.status(500).send('Erro ao obter token de acesso.');
  }
};


