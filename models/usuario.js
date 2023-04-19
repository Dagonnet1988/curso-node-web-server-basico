import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UsuarioSchema = new Schema ({
    nombre: {
        type: String, 
        required: [true, 'El nombre es obligatiorio']
    },
    correo: {
        type: String, 
        required: [true, 'El correo es obligatiorio'],
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'La contraseña es obligatioria'],
    },
    img: {
        type: String, 
    },
    rol: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario} = this.toObject();
    return usuario
}

const Usuario = model('Usuario', UsuarioSchema);

export { Usuario }