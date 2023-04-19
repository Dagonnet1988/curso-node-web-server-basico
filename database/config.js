import mongoose from "mongoose";

const dbConecction = async ( ) =>  {
    try {
        await mongoose.connect( process.env.MONGODB_CNN );

        console.log('Base de datos ON LINE');


    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}

export { dbConecction };