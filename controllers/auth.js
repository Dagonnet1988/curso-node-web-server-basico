import { response } from "express";
import { Usuario } from "../models/usuario.js";
import bcryptjs from "bcryptjs"
import { generarJWT, googleVerify } from "../helpers/index.js";

const login = async (req, res = response) => {

    const { correo, password} = req.body;

    try {
        // verificar si email existe 
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - correo"
            });
        }
        
        // si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - estado: false"
            });
        }    

        // verificar contrase#a
        const validPassword = bcryptjs.compareSync( password, usuario.password )
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - password"
            });
        }    

        //  generar el JWT
        const token = await generarJWT ( usuario.id );


        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hable con su administrador" 
        });
    }

    
};


const googleSigIn = async (req, res = response, next ) => {

    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({correo});

        if(!usuario) {
            // crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                rol: 'USER_ROLE',
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // si el usuario en BD
        if (!usuario.estado) { 
            return res.status(401).json({
                msg: 'Hable con el administador, usuario bloqueado'
            });
        }

        // generar el JWT
        const token = await generarJWT ( usuario.id );



        res.json ({
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }


};

export { 
    login,
    googleSigIn
}; 