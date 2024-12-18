import fs from 'node:fs';
import { v4 as uuidv4 } from 'uuid';
import ProductModel from '../model/product.model.js';
import { answer } from '../utils/reuse.js';
import { socketServer } from '../../app.js';

class ProductController {
    //GET
    async getProduct (req, res) {
        try {
            const products = await ProductModel.find();
            console.log(products);
            answer(res, 200, products);
        } catch {
            answer(res, 500, "Error al obtener los productos")
        }
    }

    async getProductById (req, res) {
        try {
            const productId = req.params.productId; //Convertimos el queryparams de string a number
            const product = await ProductModel.findById(productId);
            console.log(product);
            answer(res, 200, product);
        } catch {
            answer(res, 500, "Error al obtener el producto")
        }
    }

    //POST
    async postProduct (req, res) {
        try {
            const newProduct = req.body;
            await ProductModel.create(newProduct);
            answer(res, 201, "Producto creado con exito");
        } catch {
            answer (res, 500, "Error al registrar el producto")
        }
    }

    async postRealTime (req, res) {
        //Se emite
        socketServer.emit();
        
        try {
            const newProduct = req.body;
            await ProductModel.create(newProduct);
            answer(res, 201, "Producto creado con exito");
        } catch {
            answer (res, 500, "Error al registrar el producto")
        }
    }

    //PUT
    async putProduct (req, res) {
        const {title, description, code, price, status, stock, category} = req.body
        try {
            const productToEdit = parseInt(req.params.productId);
            const productReplacement = {
                title,
                description,
                code,
                price,
                status,
                stock,
                category
            }
            await ProductModel.findByIdAndUpdate(productToEdit, productReplacement);
        } catch {
            answer(res, 500, "Error al actualizar el producto")
        }
    }

    //DELETE
    async deleteProduct (req, res) {
        try {
            const productToDelete = parseInt(req.params.productId);
            await ProductModel.findByIdAndDelete(productToDelete);
            answer(res, 500, `Producto con el ID ${productToDelete} elminado correctamente`)
        } catch {
            answer(res, 500, "Error al eliminar el producto")
        }
    }


    //RENDER
    async renderHome (req, res) {
        try {
            const productos = await ProductModel.find().lean();
            console.log(productos);
            //answer(res, 200, products);
            res.render('home', {productos});
        } catch {
            answer(res, 500, "Error al obtener los productos")
        }
    }

    async renderRealTime(req, res) {
        try {
            res.render('realtimeproducts', {});
        } catch {
            answer(res, 500, "Error al obtener los productos")
        }
    }

    /*constructor(path) {
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
    }*/

    /*async getProducts() {
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
    }*/

    /*async addProduct(product) {
        await this.getProducts();
        this.idProduct = this.dbProduct.length + 1
        const newProduct = this.productFactory(product)
        this.dbProduct.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify({data: this.dbProduct })); 
    }*/

    /*async editProduct(product) {
        await this.getProducts();
        const searchIndex = this.dbProduct.findIndex((prod) => prod.id === product.id)
        this.dbProduct[searchIndex] = product;

        await fs.promises.writeFile(this.path, JSON.stringify({data: this.dbProduct })); 
    }*/

    /*async deleteProduct(product) {
        await this.getProducts();
        const searchIndex = this.dbProduct.findIndex((prod) => prod.id === product)
        this.dbProduct.splice(searchIndex,1);
        //this.dbProduct[searchIndex].active = false //Se cambia el status del producto a false para que no quede activo.
        await fs.promises.writeFile(this.path, JSON.stringify({data: this.dbProduct }));
    }*/
}

export default ProductController;