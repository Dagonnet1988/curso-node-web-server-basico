import { Router } from 'express';
export const routera = Router();
import { check } from 'express-validator';
import { esAdminRol, validarCampos, validarJWT } from '../middlewares/index.js';
import { crearProducto, obtenerProductos,
        obtenerProducto, borrarProducto, actualizarProducto } from '../controllers/productos.js';
import { existeCategoriaPorId, existeProductoPorId } from '../helpers/db-validators.js';

// todas las productos - publico
routera.get('/', obtenerProductos);

// obtener categoria por id - publico
routera.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto);

// crear producto - privado - cualquier persona con token valido
routera.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un mongo ID').isMongoId(),
    check('categoria').custom ( existeCategoriaPorId ),
    validarCampos
], crearProducto);

// actualizar - privado - cualquier persona con token valido
routera.put('/:id', [
    validarJWT,
    check('id', 'No es un mongo ID').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
], actualizarProducto);

// borrar categoria - admin
routera.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto);