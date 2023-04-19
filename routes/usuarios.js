
import { Router } from 'express';
export const router = Router();
import { check } from 'express-validator';

import { emailExiste, esRolValido, existeUsuarioPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';

import {    usuariosDelete,
            usuariosGet,
            usuariosPatch,
            usuariosPost,
            usuariosPut
} from '../controllers/usuarios.js';

router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido),
    validarCampos,
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener mas de 6 letras').isLength({min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste),
    // check rol
    check('rol').custom( esRolValido),
    validarCampos,
],usuariosPost);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);








