import { UserMedia } from '../../Model/Schema/userMediaSchema';
import { TokenModel } from '../../Model/Schema/tokenSchema';
import { getUserData } from '../../services/instaServices';

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function updateUserMedia(request: VercelRequest,response: VercelResponse,) {
  try {
    const user = 'rauldasprod'
    const accessToken: any = await TokenModel.findOne({ user }).exec()
    const userMediaData: any = await UserMedia.findOne({ username: user }).populate('data').exec();

    const { username, mediaData } = await getUserData(accessToken.longToken);

    userMediaData.username = username;
    userMediaData.data = mediaData.slice(0, 6);

    console.log('Atualizando postagens no banco de dados')
    await userMediaData.save();
    console.log('Postagens Atualizadas!')
    
  } catch (error) {
    console.error('Erro ao atualizar as midias:', error);
  }
}
