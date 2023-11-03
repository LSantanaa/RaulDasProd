import mongoose from 'mongoose';

export const mongoConnect = async ()=>{
 await mongoose.connect(`${process.env.MONGOLOCAL}`)
  
  const db =  mongoose.connection;
  
  db.on('error', console.error.bind(console, 'Erro de conexão'))
  db.once('open', function(){
    console.log('Conexao estabelecida')
  })
}