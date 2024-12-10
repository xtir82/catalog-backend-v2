import fs from 'node:fs';
import { answer } from '../utils/reuse.js';
import CartModel from "../model/cart.model.js";
import ProductModel from "../model/product.model.js";

class CartController {

    //GET
    async getCarts(req, res) {
        try {
            const cart = await CartModel.find();
            answer(res, 200, cart);
        } catch  {
            answer(res, 500, "Error al obtener los carritos");
        }
    }

    async getCartById(req, res) {
        try {
            const cartId = req.params.cartId; //Convertimos el queryparams de string a number
            const cart = await CartModel.findById(cartId);
            console.log(cart);
            answer(res, 200, cart);
        } catch {
            answer(res, 500, "Error al obtener el carrito")
        }
    }
/*
    async getCartById(cartId) {
        await this.getCarts()
        const cartFound = this.dbCart.find(cart => cart.id === cartId)

        return cartFound.product;
    }
*/
    //POST
    async addToCart(req, res) {
        const {userId, productId, quantity} = req.body;
        console.log(req.session);
        if (req.session) {
            const user = req.session;
            try {
                //let cart = await CartModel.findOne({user.cart});
                let cart = await CartModel.findOne({ user: userId});

                const productIndex = cart.products.findIndex(product => product.id === productId);
                if (productIndex > -1) {
                    // Si el producto ya está en el carrito, aumentar la cantidad
                    cart.products[productIndex].quantity += quantity;
                } else {
                    // Si el producto no está en el carrito, agregarlo
                    cart.products.push({ product: productId, quantity });
                }
                // Guardar el carrito actualizado en la base de datos
                    await cart.save();
            } catch {
                answer(res, 500, "Error al obtener el carrito")
            }
        } else {
            answer(res, 500, "El Carrito no existe");
        }
    }

    /*async addCart(cart) {
        await this.getCarts();
        const newCart = this.cartFactory()
        this.dbCart.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify({data: this.dbCart })); 
    }

    async addProductToCart(cartId, productId, quantity) {
        await this.getCarts();
        await productManager.getProducts();

        const productFound = productManager.dbProduct.find(product => product.id === productId)
        const searchIndex = this.dbCart.findIndex(cart => cart.id === cartId)
        const cartValidator = this.dbCart[searchIndex].product.findIndex(cartProd => cartProd.id === productId)

        const productToCart = {
            productId: productId,
            quantity: quantity 
        }

        //Falta Validar
        if (productFound === -1) { //Validamos si el producto existe
            return 'El producto no existe'
        } else {
            if (cartValidator === -1) { //Validamos si el producto ya esta en el carrito
                this.dbCart[searchIndex].product.push(productToCart)
            } else {
                this.dbCart[searchIndex].product[cartValidator].quantity++
            }
        }
        await fs.promises.writeFile(this.path, JSON.stringify({ data: this.dbCart })); 
    }*/
}

export default CartController;