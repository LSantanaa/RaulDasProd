import mongoose from 'mongoose';

export const mongoConnect = ()=>{
  mongoose.connect(`${process.env.MONGODB_URI}`)
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'Erro de conexão'))
  db.once('open', function(){
    console.log('Conexao estabelecida')
  })
}