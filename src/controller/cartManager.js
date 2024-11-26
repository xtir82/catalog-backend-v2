import fs from 'node:fs';
import { answer } from '../utils/reuse.js';

class CartManager {

    /*constructor() {
        this.path = path;
        this.dbCart = [];
    }*/

    //GET
    async getCarts(req, res) {
        try {
            
        } catch  {
            answer(res, 500, "Error al obtener los carts");
        }
    }
    
    /*async getCarts() {
        const list = await fs.promises.readFile(this.path, 'utf-8')
        this.dbCart = [... JSON.parse(list).data]
        return [... this.dbCart]
    }*/

    async getCartById(cartId) {
        await this.getCarts()
        const cartFound = this.dbCart.find(cart => cart.id === cartId)

        return cartFound.product;
    }

    //POST
    async addCart(cart) {
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
    }
}

export default CartManager;