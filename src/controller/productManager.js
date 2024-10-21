import fs from 'node:fs';
import { v4 as uuidv4 } from 'uuid';

class ProductManager {
    constructor(path) {
        this.path = path;
        this.dbProduct = [];
        this.idProduct = 0;
    }

    productFactory({title, description, code, price, status, stock, category}) {
        const newProduct = {id: uuidv4(), 
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails: '',
            active: true
        }
        return newProduct
    }

    async getProducts() {
        const list = await fs.promises.readFile(this.path, 'utf-8')
        //console.log(list)
        this.dbProduct = [... JSON.parse(list).data]
        //console.log(this.dbProduct)
        return [... this.dbProduct]
    }

    async getProductById(productId) {
        await this.getProducts();
        const productFound = this.dbProduct.find(product => product.id === productId)
        
        return productFound;
    }

    async addProduct(product) {
        await this.getProducts();
        this.idProduct = this.dbProduct.length + 1
        const newProduct = this.productFactory(product)
        this.dbProduct.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify({data: this.dbProduct })); 
    }

    async editProduct(product) {
        await this.getProducts();
        const searchIndex = this.dbProduct.findIndex((prod) => prod.id === product.id)
        this.dbProduct[searchIndex] = product;

        await fs.promises.writeFile(this.path, JSON.stringify({data: this.dbProduct })); 
    }

    async deleteProduct(product) {
        await this.getProducts();
        const searchIndex = this.dbProduct.findIndex((prod) => prod.id === product)
        this.dbProduct.splice(searchIndex,1);
        //this.dbProduct[searchIndex].active = false //Se cambia el status del producto a false para que no quede activo.
        await fs.promises.writeFile(this.path, JSON.stringify({data: this.dbProduct }));
    }
}

export default ProductManager;