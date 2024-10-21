import express from "express";
import { __dirname } from "./src/utils.js";
import handlebars from "express-handlebars";
import morgan from "morgan";
import { Server } from "socket.io";
import "dotenv/config";

//Routes
import CartRoute from './src/routes/cart.router.js';
import ProductRoute, { productManager } from './src/routes/product.router.js';

import Home from './src/routes/home.router.js'
import RealTimeProducts from './src/routes/realtimeproducts.router.js';
import mongoose from "mongoose";

const app = express();
const port = 8080;

//Template Engine
app.engine('handlebars', handlebars.engine()); //Inicializamos el template engine, en este caso handlebars
app.set('views', __dirname + '/views'); //Configuramos la ruta de las views
app.set('view engine', 'handlebars');

//Middleware
app.use(express.json()); //body-parse
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(morgan("tiny"));

//Enrutadores
app.use('/api/product',  ProductRoute);
app.use('/api/cart',  CartRoute);
app.use('/home',  Home);
app.use('/realtimeproducts', RealTimeProducts);

//Creamos la variable httpServer y instanciamos para que funcione con sockets
const httpServer = app.listen(port, () => {
    console.log('Server started on port ' + port)
});

export const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log('New user connected');

    const realtimeDB = await productManager.getProducts();
    socketServer.emit('socketDB', realtimeDB);
    
    //Recibimos la data del producto *1
    socket.on('newProduct', (data) => {
        realtimeDB.push(data);

        //Emitimos al servidor la base de datos
        socketServer.emit('socketDB', realtimeDB);
    })    
} );

mongoose.connect('mongodb+srv://agcl82:wQpqP9TJTk2qWZKH@catalog-app.vd4fk.mongodb.net/?retryWrites=true&w=majority&appName=catalog-app',
    { dbName: 'productos' })
    .then( () => {
        console.log('Connected to DB')
    })