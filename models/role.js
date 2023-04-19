import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const RoleSChema = new Schema ({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
}); 

const Role = model('Role', RoleSChema);

export { Role }