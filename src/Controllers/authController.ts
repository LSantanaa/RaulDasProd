import { Request, Response } from "express";
import axios from 'axios';
import querystring from 'querystring';
import dotenv from 'dotenv';
import { TokenModel } from "../Model/Schema/tokenSchema";

dotenv.config();

export const authInsta = (req: Request, res: Response) => {
  res.redirect(`https://api.instagram.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=user_profile,user_media&response_type=code`)
}

export const getAccessToken = async (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Código de autorização ausente.');
  }

  try {
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

    const longAccessTokenResponse = await axios.get('https://graph.instagram.com/access_token', {
      params: {
        grant_type: 'ig_exchange_token',
        client_secret:process.env.CLIENT_SECRET,
        access_token: accessToken
      }
    })

    let longAccessToken = longAccessTokenResponse.data;



    const today = new Date();
    const secondsToExpire = longAccessToken.expires_in;
    const expirationDate = new Date(today.getTime() + secondsToExpire * 1000)
    
    const newToken = new TokenModel({
      user: 'teste1',
      longToken: 'tokenTest',
      createdAt: today,
      expiresAt: expirationDate
    })

    const inserirToken = await newToken.save();

    res.send(`Token de acesso curto obtido com sucesso: ${accessToken}<br>
    Token de acesso longo obtido com sucesso: ${longAccessToken.access_token}<br>
    O Token expira em ${(((longAccessToken.expires_in / 60) / 60) / 24).toFixed(0)} dias.
    ` );
  } catch (error) {
    console.error('Erro ao obter token de acesso:', error);
    res.status(500).send('Erro ao obter token de acesso.');
  }
};


