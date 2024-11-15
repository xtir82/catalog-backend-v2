import express from "express";
import cookieParser from "cookie-parser";
import { __dirname } from "./src/utility.js";
import handlebars from "express-handlebars";
import morgan from "morgan";
import { Server } from "socket.io";
import "dotenv/config";
import session from "express-session";
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';
import * as path from 'node:path';
import DB from "./src/database/database.js"
import passport from "passport";
import initializePassport from "./src/config/passport.config.js";
import Handlebars from "handlebars";
import ProductModel from "./src/model/product.model.js";

//Routes
import CartRoute from './src/routes/cart.router.js';
import ProductRoute from './src/routes/product.router.js';
import RealTimeProducts from './src/routes/realTimeProducts.router.js';

//import CookieRouter from './src/routes/cookies.router.js';
import SessionRouter from './src/routes/session.router.js';
import ViewsRouter from './src/routes/views.router.js';

//Singleton
const DBinstance = DB;

const app = express();
const port = process.env.PORT;

//Session file store
const fileStore = new FileStore(session);

//Template Engine
const enginehandlebars = Handlebars.create({
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true 
})

app.engine('handlebars', handlebars.engine({handlebars: enginehandlebars})); //Inicializamos el template engine, en este caso handlebars
app.set("views", path.join(__dirname, 'views')); //Configuramos la ruta de las views
app.set('view engine', 'handlebars');


//Middleware
app.use(express.json()); //body-parse
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(session({
    //Creating a session with Memory Storage
    secret: process.env.SESSION_SECRET, //Value to sign the cookie
    resave: true, //Let maintain the session active
    saveUninitialized: true, //Leave us to save the session even if the session object is empty
    //Adding File Store
    /*store: new fileStore({path:'./src/sessions', //Route where the sessions files will be stored
        ttl: 6000, //Time to live in
        retries: 2}) //Quantity of retry*/

    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        dbName: 'catalog-app-db',
        ttl: 120 //TTL in Seconds
    })
}))

//Using Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Router
app.use('/api/product', ProductRoute);
app.use('/api/cart',  CartRoute);
app.use('/realtimeproducts', RealTimeProducts);
//app.use('/api/cookie', CookieRouter);
app.use('/api/session', SessionRouter);
app.use('/', ViewsRouter);

//Creamos la variable httpServer y instanciamos para que funcione con sockets
const httpServer = app.listen(port, () => {
    console.log('Server started on port ' + port)
});

export const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log('New user connected');

    const realtimeDB = await ProductModel.find();
    socketServer.emit('socketDB', realtimeDB);
    
    //Funcion para registrar un nuevo producto
    socket.on('newProduct', async (data) => {
        await ProductModel.create(data);
        const realtimeDB = await ProductModel.find();
        //Emitimos al servidor la base de datos
        socketServer.emit('socketDB', realtimeDB);
    }) 
} );
