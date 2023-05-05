import express from 'express';
import cors from 'cors';
import { dbConecction } from '../database/config.js';
import fileUpload from 'express-fileupload';
import { router, route,
        rout, routera, rou, router1
        } from '../routes/index.js';



class Server {
    constructor () {
        this.app = express();
        this.port = process.env.PORT;
        
        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
            uploads:    '/api/uploads'
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

        // carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes () {
        this.app.use(this.paths.auth, route);
        this.app.use(this.paths.buscar, rou);
        this.app.use(this.paths.categorias, rout);
        this.app.use(this.paths.usuarios, router);
        this.app.use(this.paths.productos, routera);
        this.app.use(this.paths.uploads, router1);
        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'servidor corriendo en puerto', this.port );
        });
    }
}

export { Server };