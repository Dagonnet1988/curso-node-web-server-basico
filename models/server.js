import express from 'express';
import cors from 'cors';
import { dbConecction } from '../database/config.js';
import { router } from '../routes/usuarios.js';
import { route } from '../routes/auth.js';
import { rout } from '../routes/categorias.js';
import { routera } from '../routes/productos.js';
import { rou } from '../routes/buscar.js';



class Server {
    constructor () {
        this.app = express();
        this.port = process.env.PORT;
        
        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios'
        };
       
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
        this.app.use(this.paths.auth, route);
        this.app.use(this.paths.buscar, rou);
        this.app.use(this.paths.categorias, rout);
        this.app.use(this.paths.usuarios, router);
        this.app.use(this.paths.productos, routera);
        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'servidor corriendo en puerto', this.port );
        });
    }
}

export { Server };