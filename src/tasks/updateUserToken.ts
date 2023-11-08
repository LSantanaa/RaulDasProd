import { TokenModel } from '../Model/Schema/tokenSchema';
import { refreshToken } from '../services/instaServices';

export default async function updateToken() {
    try {
      const username = 'rauldasprod'
      const accessToken: any = await TokenModel.findOne({ user: username }).exec()

      const today = new Date();
      const expireDate = new Date(accessToken.expiresAt);

      const diffMs = expireDate.getTime() - today.getTime();

      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays <= 20) {
        console.log('a data de expiração do token está próxima, atualizando token')
        const updateTokenResponse = await refreshToken(accessToken.longToken);

        if(updateTokenResponse.status = 200){
          accessToken.longToken = updateTokenResponse.data.access_token;
          accessToken.expiresAt = new Date(today.getTime() + updateTokenResponse.data.expires_in * 1000);

          await accessToken.save();
          console.log('Token Atualizado, novo token:', accessToken)
        }

      }else{
        console.log(`a data de expiração do token é segura, dias até expirar: ${diffDays}`)
      }

    } catch (error) {
      console.error('Erro ao atualizar o token:', error);
    }
}