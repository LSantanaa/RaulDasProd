import cron from 'node-cron';
import { TokenModel } from '../Model/Schema/tokenSchema';
import { refreshToken } from '../services/instaService';

export default function updateEveryFiveDays() {
  const updateDataInDatabase = async () => {
    try {
      const username = 'le0.Sant_'
      const accessToken: any = await TokenModel.findOne({ user: username }).exec()

      const today = new Date();
      const expireDate = new Date(accessToken.expiresAt);

      const diffMs = expireDate.getTime() - today.getTime();

      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays <= 3) {
        console.log('a data de expiração do token está próxima, atualizando token')
        const updateTokenResponse = await refreshToken(accessToken.longToken);

        accessToken.longToken = updateTokenResponse.data.access_token;
        accessToken.expiresAt = new Date(today.getTime() + updateTokenResponse.data.expires_in * 1000);
        await accessToken.save();
      }

    } catch (error) {
      console.error('Erro ao atualizar o token:', error);
    }

  }

  cron.schedule('*/1 * * * *', () => {
    updateDataInDatabase();
  });
}