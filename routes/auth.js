import { Router } from 'express';
export const route = Router();
import { check } from 'express-validator';
import { login } from '../controllers/auth.js';
import { validarCampos } from '../middlewares/validar-campos.js';




route.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
    
], login);

