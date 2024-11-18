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

