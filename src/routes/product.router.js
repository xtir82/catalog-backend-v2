import { Router } from "express";
import { __dirname } from "../utility.js";
import ProductController from "../controller/product.controller.js";

const router = Router();

export const productManager = new ProductController();

//Rutas
router.get('/', productManager.getProduct);
router.get('/:productId', productManager.getProductById);
router.post('/', productManager.postProduct);
router.delete('/:productId', productManager.deleteProduct);
router.put('/:productId', productManager.putProduct);

export default router;

