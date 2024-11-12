import fs from 'node:fs';
import { v4 as uuidv4 } from 'uuid';

class CartManager {
cartId = 0;

    constructor(path) {
        this.path = path;
        this.dbCart = [];
    }

    cartFactory() {
        const newCart = { id: uuidv4(), product: [] }
        return newCart
    }

    //GET
    async getCarts() {
        const list = await fs.promises.readFile(this.path, 'utf-8')
        this.dbCart = [... JSON.parse(list).data]
        return [... this.dbCart]
    }

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