import { request, response } from 'express'
import jwt from 'jsonwebtoken'
import { Usuario } from '../models/usuario.js';


const validarJWT = async (req = request, res = response, next ) => {
    
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

   try { 

    const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    // leer usuario del uid
    const usuario = await Usuario.findById ( uid );

    if (!usuario) {
        return res.status(401).json ({
            msg: 'Token no valido - Usuario no existe en BD'
        });
    
    } 
    
    // verificar estado 

    if (!usuario.estado) {
        return res.status(401).json ({
            msg: 'Token no valido - Usuario desactivado'
        })
    }
    
    
    req.usuario = usuario;
    next();

    
   } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
   }
    
       

    
}

export { validarJWT }