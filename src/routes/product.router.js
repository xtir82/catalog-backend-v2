import { Router } from "express";
import { __dirname } from "../utility.js";
import ProductManager from "../controller/productManager.js";

const router = Router();

export const productManager = new ProductManager();

//Rutas
router.get('/', productManager.getProduct);
router.get('/:productId', productManager.getProductById);
router.post('/', productManager.postProduct);
router.delete('/:productId', productManager.deleteProduct);
router.put('/:productId', productManager.deleteProduct);

export default router;

/*router.get('/', async (req,res) => {
    try {
        const respuesta = await productManager.getProducts();
        res.status(200).json({
            mensaje:'Lista de Productos Obtenida',
            respuesta: respuesta
        })
    } catch(error) {
        res.status(404).send('Ops! hay un problema: ' + error);
    }
})*/

/*router.get('/:productId', async (req, res) => {
    try {
        const productId = parseInt(req.params.productId); //Convertimos el queryparams de string a number
        const productFound = await productManager.getProductById(productId);
    
        res.status(200).json({
            mensaje:'Se ha agregado el Producto',
            producto: productFound,
        })
    } catch(error) {
        res.status(404).send('Ops! hay un problema: ' + error);
    }
})*/

/*router.post('/', async (req,res) => {
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

/*router.put('/:productId', async (req, res) => {
    try {
        const productToEdit = parseInt(req.params.productId);
        const productReplacement = {
            id: productToEdit,
            title: req.body.title,
            description: req.body.description,
            code: req.body.code,
            price: req.body.price,
            status: req.body.status,
            stock: req.body.stock,
            category: req.body.category
        }
        await productManager.editProduct(productReplacement);
    
        res.status(200).json({
            mensaje: 'Prueba PUT Producto'
        })
    } catch(error) {
        res.status(404).send('Ops! hay un problema: ' + error);
    }
})*/

/*router.delete('/:productId', async (req, res) => {
    try {
        const productToDelete = parseInt(req.params.productId);
        await productManager.deleteProduct(productToDelete);
    
        res.status(204).json({
            mensaje: 'Prueba DELETE Producto'
        })
    } catch(error) {
        res.status(404).send('Ops! hay un problema: ' + error);
    }
})*/

