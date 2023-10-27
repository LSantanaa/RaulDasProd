import cron from 'node-cron';
import { deleteCache } from '../services/cacheService';

export default function delCacheFromServer(){
  cron.schedule('0 0 * * *', () => {
    deleteCache();
  });
}
