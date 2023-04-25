import { response } from "express";
import bcryptjs from "bcryptjs";
import { Usuario } from "../models/usuario.js";


const usuariosGet = async (req, res = response) => {
    // const { q, nombre = 'No Name', apikey, page, limit} = req.query;
    const query = { estado: true};
    const { limite = 5, desde = 0 } = req.query;
   

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
        
    });
}
const usuariosPost = async (req, res = response) => {

    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    //  VERIFICAR SI CORREO EXISTE
    // const existeEmail = await Usuario.findOne({ correo });
    // if (existeEmail) {
    //     return res.status(400).json({
    //         msg: 'Este correo ya esta registrado'
    //     })
    // }

    // encriptar
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    
    await usuario.save();

    res.json( usuario );
}
const usuariosPut = async (req, res = response) => {
    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra base de datos
    if ( password ) {
        // encriptar
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate ( id, resto );


    res.json( usuario );
}
const usuariosPatch = (req, res = response) => {
    
    res.json({
        msg: 'patch API - controlador'
    });
}
const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate (id, {estado: false})
   


    res.json({
        usuario,
       
        
    });
}



export {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}