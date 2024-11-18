import { Router } from "express";
import { __dirname } from "../utility.js";
import { productManager } from "./product.router.js";

const router = Router();

//Rutas
router.post("/", productManager.postRealTime);

/*router.get('/', async (req,res) => {
    try {
        const respuesta = await cartManager.getCarts();
        res.status(200).json({
            mensaje:'Lista de Carritos Obtenida',
            respuesta: respuesta
        })
    } catch(error) {
        res.status(404).send('Ops! hay un problema: ' + error);
    }
   //const {obj} = req.query; //Destructuramos
    res.render('realtimeproducts', {
        productos: [],
    }) //Renderiza la vista
    res.render( 'realtimeproducts', {} )
})*/

/*router.get('/', async (req,res) => {
    try {
        const respuesta = await productManager.getProducts();
        res.render('home', {
            productos: 
        })
        res.status(200).json({
            mensaje:'Lista de Productos Obtenida',
            respuesta: respuesta
        })
    } catch(error) {
        res.status(404).send('Ops! hay un problema: ' + error);
    }
    const respuesta = await productManager.getProducts();
    res.render('realtimeproducts', {
            productos: respuesta,
        })
})*/

/*router.post('/', async (req,res) => {
    //aca se debe emitir
    socketServer.emit();
    
    try {
        const productToAdd = req.body;
        await productManager.addProduct(productToAdd);
        res.status(201).json({
            mensaje: 'Prueba POST Producto'
        })
    } catch(error) {
        res.status(404).send('Ops! hay un problema: ' + error);
    }
})*/

export default router;