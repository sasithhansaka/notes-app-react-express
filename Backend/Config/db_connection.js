import mongoose from 'mongoose';

const db_connection = async ()=>{
    try{
       const connect = await  mongoose.connect(process.env.CONNECTION_STRING);
       console.log('database connected:',connect.connection.host)
    }
    catch (error) {
        console.error('Database connection error:', error.message);
      }
}


export default db_connection;