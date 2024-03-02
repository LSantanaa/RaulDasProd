import mongoose from 'mongoose';

export const mongoConnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`, {
      serverSelectionTimeoutMS: 600000,
    });

    const db = mongoose.connection;

    db.on('error', (error) => {
      console.error('Erro de conexão:', error);
      mongoose.disconnect();
    });

    db.once('open', function () {
      console.log('Conexao estabelecida');
    });

    db.on('disconnected', function () {
      console.log('MongoDB desconectado! Reconectando...');
       mongoose.connect(`${process.env.MONGODB_URI}`, {
        serverSelectionTimeoutMS: 600000,
      });
    });
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
};
