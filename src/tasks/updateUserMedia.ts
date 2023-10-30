import cron from 'node-cron';
import { UserMedia } from '../Model/Schema/userMediaSchema';
import { TokenModel } from '../Model/Schema/tokenSchema';
import { getUserData } from '../services/instaServices';

export default function updateUserMedia() {
  const updateDataInDatabase = async () => {
    try {
      const user = 'rauldasprod'
      const accessToken: any = await TokenModel.findOne({ user }).exec()
      const userMediaData: any = await UserMedia.findOne({ username: user }).populate('data').exec();

      const { username, mediaData } = await getUserData(accessToken.longToken);

      userMediaData.username = username;
      userMediaData.data = mediaData.slice(0,6);

      console.log('Atualizando postagens no banco de dados')
      await userMediaData.save();
      console.log('Postagens Atualizadas!')

    } catch (error) {
      console.error('Erro ao atualizar as midias:', error);
    }

  }

  cron.schedule('0 0 */2 * *', () => {
    updateDataInDatabase();
  });
}