import { Schema, model } from "mongoose";

//Creamos el esquema del Documento de MongoDB
const productSchema = new Schema({ 
    title: String,
    description: String,
    code: Number,
    price: Number,
    status: Boolean,
    stock: Number, 
    category: String
    })

//Se crea un modelo basado en el esquema creado anteriormente
export const ProductModel = model('productos', productSchema);
