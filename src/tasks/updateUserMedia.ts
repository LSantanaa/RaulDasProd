import cron from 'node-cron';
import { userMedia } from '../Model/Schema/userMediaSchema';
import { TokenModel } from '../Model/Schema/tokenSchema';
import { getUserData } from '../services/instaService';

export default function updateUserMedia() {
  const updateDataInDatabase = async () => {
    try {
      const user = 'rauldasprod'
      const accessToken: any = await TokenModel.findOne({ user }).exec()
      const userMediaData: any = await userMedia.findOne({ username: user }).populate('data').exec();

      const { username, mediaData } = await getUserData(accessToken.longToken);

      userMediaData.username = username;
      userMediaData.data = mediaData;

      console.log('Atualizando postagens no banco de dados')
      userMediaData.save();

    } catch (error) {
      console.error('Erro ao atualizar as midias:', error);
    }

  }

  cron.schedule('* * */5 * *', () => {
    updateDataInDatabase();
  });
}