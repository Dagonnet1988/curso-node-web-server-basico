import { Router } from 'express';
export const route = Router();
import { check } from 'express-validator';
import { googleSigIn, login } from '../controllers/auth.js';
import { validarCampos } from '../middlewares/validar-campos.js';




route.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
    
], login);

route.post('/google', [
    check('id_token', 'El id_token es obligatorio').not().isEmpty(),
    validarCampos    
], googleSigIn);
