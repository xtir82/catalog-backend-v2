import { Router } from "express";
import { __dirname } from "../utility.js";
import CartController from "../controller/cart.controller.js";

const router = Router();

const cartController = new CartController();

//Rutas
router.get('/', cartController.getCarts);
router.get('/:cartId', cartController.getCartById);

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
})

router.get('/:cartID', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cartID); //Convertimos el queryparams de string a number
        const cartFound = await cartManager.getCartById(cartId);
    
        res.status(200).json({
            mensaje:`Carrito con el id ${cartId}`,
            producto: cartFound,
        })
    } catch(error) {
        res.status(404).send('Ops! hay un problema: ' + error);
    }
})
*/

router.post('/', async (req, res) => {
    try {
        await cartManager.addCart();

        res.status(201).json({
            mensaje: 'Prueba POST Cart'
        })
    } catch(error) {
        res.status(404).send('Ops! hay un problema: ' + error);
    }
})

router.post('/:cartId/product/:productId', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cartId); //Convertimos el queryparams de string a number
        const productId = parseInt(req.params.productId);
        const quantity = req.body.quantity;
    
        await cartManager.addProductToCart(cartId, productId, quantity);
    
        res.status(201).json({
            mensaje: 'Prueba POST Cart'
        })
    } catch(error) {
        res.status(404).send('Ops! hay un problema: ' + error);
    }
})

router.put('/:cartID', (req, res) => {
})

router.delete('/:cartID', (req, res) => {
})

export default router;