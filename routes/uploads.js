                 
import { Router } from 'express';
export const router1 = Router();
import { check } from 'express-validator';
import { validarCampos, validarArchivoSubir } from '../middlewares/index.js';
import { actualizarImagenCloudinary, cargarArchivo, mostrarImagen } from "../controllers/uploads.js"
import { coleccionesPermtidas } from '../helpers/index.js';


router1.post( '/', validarArchivoSubir, cargarArchivo )


router1.put( '/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=> coleccionesPermtidas(c, ['usuarios', 'productos' ] ) ),
    validarCampos
], actualizarImagenCloudinary)

router1.get('/:coleccion/:id',[
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=> coleccionesPermtidas(c, ['usuarios', 'productos' ] ) ),
    validarCampos
], mostrarImagen)