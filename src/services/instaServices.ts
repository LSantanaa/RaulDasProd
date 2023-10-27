import axios from 'axios';
import { userMedia } from '../Model/Schema/userMediaSchema';
import { TokenModel } from '../Model/Schema/tokenSchema';


//Faz uma requisição para API do Instagram para obter usuário e mídia do usuário
export const getUserData = async (accessToken: string)=>{
  const userResponse = await axios.get(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`);
  const mediaResponse = await axios.get(`https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type,thumbnail_url&access_token=${accessToken}}`);

  return{
    username: userResponse.data.username,
    mediaData: mediaResponse.data.data,
  };
};

//Faz uma requisição para a API do Instagram para atualizar Token
export const refreshToken = async (accessToken: string)=>{
  const tokenResponse = await axios.get(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`)
  return tokenResponse;
}


//salva a midia no banco
export const saveUserDataToDatabase = async (username: string, mediaData: any) =>{
  const newUserMedia = new userMedia({
    username,
    data: mediaData,
  });

  await newUserMedia.save();
};

//salva o token no banco
export const saveUserTokenToDatabase = async (longAccessToken: any, username: string)=>{
  const today = new Date();
  const secondsToExpire = longAccessToken.expires_in;
  const expirationDate = new Date(today.getTime() + secondsToExpire * 1000)
  
  const newToken = new TokenModel({
    user: username,
    longToken: longAccessToken.access_token,
    createdAt: today,
    expiresAt: expirationDate,
  })
  
  await newToken.save();
}