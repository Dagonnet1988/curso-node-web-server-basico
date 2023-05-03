import { response } from "express";
import { Producto, Categoria } from "../models/index.js";
import { body } from "express-validator";

// obtenerProductos - paginado - total - populate
const obtenerProductos = async (req, res = response) => {
    
    const query = { estado: true};
    const { limite = 5, desde = 0 } = req.query;
   

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
        
    });
}


// obtenerProducto - populate
const obtenerProducto = async(req, res = response) => {
    const { id } = req.params;
    
    const producto = await Producto.findById(id)
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre');


    res.json(producto);
}


// crear Producto
const crearProducto = async (req, res = response, next) => {
    
    const {estado, usuario, ...body} = req.body;
    // const nombre = body.nombre.toUpperCase();

    const productoDB = await Producto.findOne({nombre: body.nombre.toUpperCase() });

    if (productoDB) {
        res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        })
    }
    
    
    // generar data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
        categoria: body.categoria.toUpperCase()
    }

    const producto = new Producto(data);

    // Guardar en DB
    await producto.save();

    res.status(201).json(producto);

}

// actualizarProducto  
const actualizarProducto = async (req, res = response) => {
    
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    // data.categoria = data.categoria.toUpperCase();
    data.usuario = req.usuario._id;
    
    
    
    const producto = await Producto.findByIdAndUpdate ( id, data, { new: true });


    res.json( producto);
}

//  borrarProducto - cambiar estado a false
const borrarProducto = async(req, res = response) => {

    const { id } = req.params;
    
    const productoBorrado = await Producto.findByIdAndUpdate ( id, {estado: false}, { new: true});
    
    res.json(productoBorrado)

}

export {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}