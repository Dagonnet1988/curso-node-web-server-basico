import { Categoria, Producto, Usuario } from '../models/index.js';
import { Role } from '../models/role.js';


const emailExiste = async ( correo  = '')  => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error (`El correo ${correo} ya está registrado.`);
    }
}

const esRolValido =  async ( rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error (`El rol ${ rol } no está registrado en la BD`)
    }
}

const existeCategoriaPorId = async ( id )  => {
    const existeCategoria = await Categoria.findById( id );
    if (!existeCategoria) {
        throw new Error (`El id '${id}' no existe`);
    }
}

const existeProductoPorId = async ( id )  => {
    const existeProducto = await Producto.findById( id );
    if (!existeProducto) {
        throw new Error (`El  '${id}' no existe`);
    }
}

const existeUsuarioPorId = async ( id )  => {
    const existeId = await Usuario.findById( id );
    if (!existeId) {
        throw new Error (`El id '${id}' no existe`);
    }
}

// validar colecciones permitidas
const coleccionesPermtidas = ( coleccion = '', colecciones = [] ) => {
    const incluida = colecciones.includes( coleccion );
    if (!incluida) {
        throw new Error (`La coleccion ${ coleccion } no es permitida - ${ colecciones }` )
    }
    return true
}


export {emailExiste, 
        esRolValido,
        existeCategoriaPorId,
        existeProductoPorId,
        existeUsuarioPorId,
        coleccionesPermtidas
}