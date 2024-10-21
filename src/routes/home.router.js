import { Router } from "express";
import { productManager } from "./product.router.js";
import { __dirname } from "../utils.js";

const router = Router();

router.get('/', async (req,res) => {
    /*try {
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
    }*/
    const respuesta = await productManager.getProducts();
    res.render('home', {
            productos: respuesta,
        })
})

export default router;