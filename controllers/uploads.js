import path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import { response } from "express";
import { subirArchivo } from "../helpers/index.js";
import { Usuario, Producto } from "../models/index.js";
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({ 
  cloud_name: 'doq2dgchq', 
  api_key: '597682311534342', 
  api_secret: 'XNYVjLReB6hfeHnLkAr9G6PfBAw',
  secure: true
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const cargarArchivo = async (req, res = response) => {
      
  try {
    
    // txt, md
    // const nombre = await subirArchivo ( req.files, ['txt', 'md'], 'textos');  
    const nombre = await subirArchivo ( req.files, undefined, 'imgs');  
    res.json({ nombre });
    
  } catch (msg) {
    res.status(400).json({ msg })
    
  }
  
}

const actualizarImagen = async (req, res = response) => {


  const { id, coleccion } = req.params;

  let modelo;


  switch ( coleccion ) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un usuario con el id  ${ id}`})
      }
      break;

    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un producto con el id  ${ id}`})
      }
      break;
  
    default:
      return res.status(500).json({ msg: 'Se me olvido validar esto'})
  }
// limpiar imagenes previas
  if (modelo.img ){
    const pathImg = path.join('./uploads', coleccion, modelo.img);
    if ( fs.existsSync(pathImg)){
      fs.unlinkSync(pathImg);
    }

}
  
  const nombre = await subirArchivo ( req.files, undefined, coleccion);
  modelo.img = nombre;
  await modelo.save();

  res.json({ modelo })

}

const actualizarImagenCloudinary = async (req, res = response) => {


  const { id, coleccion } = req.params;

  let modelo;


  switch ( coleccion ) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un usuario con el id  ${ id}`})
      }
      break;

    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un producto con el id  ${ id}`})
      }
      break;
  
    default:
      return res.status(500).json({ msg: 'Se me olvido validar esto'})
  }
// limpiar imagenes previas
  if (modelo.img ){
    const nombreArr = modelo.img.split('/');
    const nombre    = nombreArr [nombreArr.length -1];
    const [ public_id ] = nombre.split('.');
    cloudinary.uploader.destroy ( public_id );

}
  
  const { tempFilePath } = req.files.archivo
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  modelo.img = secure_url;

  await modelo.save();

  res.json( modelo );

}
//  mostrar imagen subida
const mostrarImagen = async (req, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch ( coleccion ) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({ 
          msg: `No existe un usuario con el id  ${ id}`
        })
      }
      break;

    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: `No existe un producto con el id  ${ id}`})
      }
      break;
  
    default:
      return res.status(500).json({ msg: 'Se me olvido validar esto'})
  }
// limpiar imagenes previas
  if (modelo.img ){
    
    const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
    if ( fs.existsSync(pathImg)){
      return res.sendFile(pathImg)
      
    }

}
  const noImage = path.join(__dirname, '../assets/no-image.jpg');
  res.sendFile(noImage);
}

export {cargarArchivo,
        actualizarImagen,
        mostrarImagen,
        __filename,
        __dirname,
        actualizarImagenCloudinary
}