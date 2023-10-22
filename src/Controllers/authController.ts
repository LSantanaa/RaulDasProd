import { Request, Response } from "express";
import axios from 'axios';
import querystring from 'querystring';

export const authInsta = (req: Request, res: Response) => {
  res.redirect(`https://api.instagram.com/oauth/authorize?client_id=625643059766168&redirect_uri=https://raul-das-prod.vercel.app/auth&scope=user_profile,user_media&response_type=code`)
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
        client_id: 625643059766168,
        client_secret: '7cfce4dbad452f6a1a9be6b46cd3ac8f',
        grant_type: 'authorization_code',
        redirect_uri: 'https://raul-das-prod.vercel.app/auth',
        code: code.toString()
      })
    );

    const accessToken = accessTokenResponse.data.access_token;
    
    let longAccessToken:any;

    const longAcessTokenResponse = await axios.get('https://graph.instagram.com/access_token', {
      params: {
        grant_type: 'ig_exchange_token',
        client_secret: '7cfce4dbad452f6a1a9be6b46cd3ac8f',
        access_token: accessToken
      }
    })
    .then(function(response){
      longAccessToken = response;;
    })
    .catch(function(error){
      console.log(error)
    })


    res.send('Token de acesso curto obtido com sucesso: ' + accessToken);
    res.send('Token de acesso longo obtido com sucesso: ' + longAccessToken.access_token);
    res.send('Token de acesso longo expira em: ' + (((longAccessToken.expires_in / 60) / 60) / 24 ).toFixed(0) + 'Dias');
  } catch (error) {
    console.error('Erro ao obter token de acesso:', error);
    res.status(500).send('Erro ao obter token de acesso.');
  }
};


