import { Request, Response } from "express";
import axios from 'axios';

export const authInsta = (req: Request, res: Response) => {
  res.redirect(`https://api.instagram.com/oauth/authorize?client_id=625643059766168&redirect_uri=https://raul-das-prod.vercel.app/auth&scope=user_profile,user_media&response_type=code`)
}

export const getAccessToken = async (req: Request, res: Response) => {
    const code = req.query.code;
   console.log(code)
    // try {
    //   const response = await axios({
    //     method: 'post',
    //     url: 'https://api.instagram.com/oauth/access_token',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     data: {
    //       client_id: '625643059766168',
    //       client_secret: '7cfce4dbad452f6a1a9be6b46cd3ac8f',
    //       grant_type: 'authorization_code',
    //       redirect_uri: 'https://raul-das-prod.vercel.app/auth',
    //       code,
    //     }
    //   });

    //   const accessToken = response.data.access_token;
    //   localStorage.setItem('token', JSON.stringify(accessToken))
    //   console.log(accessToken)
    //   res.redirect('/')
    // } catch (error) {
    //   res.redirect('/')
    //   console.error(`Erro ao obter o token de acesso do Instagram: ${error}`);
    // }
}




