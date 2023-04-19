import express from 'express';
import cors from 'cors';
import { router } from '../routes/usuarios.js';
import { dbConecction } from '../database/config.js';


class Server {
    constructor () {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // conectar DB
        this.conectarDB();
        
        
        // middlewares
        this.middlewares();

        // rutas de mi app
        this.routes();
    } ;

    async conectarDB () {
            await dbConecction();
    }

    middlewares () {
        // cors
        this.app.use(cors());

        //lectura y paseo del body 
        this.app.use( express.json() );
        
        // directorio publico
        this.app.use(express.static('public') );
    }

    routes () {
        this.app.use(this.usuariosPath, router);
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'servidor corriendo en puerto', this.port );
        });
    }
}

export { Server };