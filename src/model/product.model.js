import { Schema, model } from "mongoose";

//Creamos el esquema del Documento de MongoDB
const productSchema = new Schema({ 
    title: {type: String},
    description: {type: String},
    code: {type: Number},
    price: {type: Number},
    status: {type: Boolean},
    stock: {type: Number}, 
    category: {type: String}
    })

//Se crea un modelo basado en el esquema creado anteriormente
const ProductModel = model('products', productSchema);
export default ProductModel
