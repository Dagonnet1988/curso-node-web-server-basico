import { Router } from 'express';
export const rout = Router();
import { check } from 'express-validator';
import { esAdminRol, validarCampos, validarJWT } from '../middlewares/index.js';
import { actualizarCategoria, borrarCategoria,
    crearCategoria, obtenerCategoria, obtenerCategorias 
    } from '../controllers/categorias.js';
import { existeCategoriaPorId } from '../helpers/db-validators.js';

// todas las categorias - publico
rout.get('/', obtenerCategorias);

// obtener categoria por id - publico
rout.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], obtenerCategoria);

// crear categoria - privado - cualquier persona con token valido
rout.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// actualizar - privado - cualquier persona con token valido
rout.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
], actualizarCategoria);

// borrar categoria - admin
rout.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria);