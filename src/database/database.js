import { connect } from 'mongoose';
import 'dotenv/config';
import configObject from '../config/config.js';

const {mongo_uri} = configObject;

/*
connect(configObject.mongo_uri, {dbName: 'catalog-app-db'})
.then(() => console.log('Connected to DB'))
.catch(err => console.log('Error connecting to DB', err));
*/

class DBConnect {
    static #instance;

    constructor() {
        connect(mongo_uri, {dbName: 'catalog-app-db'});
    }

    static getInstance() {
        if (this.#instance) {
            console.log("Conection Loaded");
            return this.#instance;
        }

        this.#instance = new DBConnect();
        console.log("Connection Successful");
        return this.#instance;
    }
}

export default DBConnect.getInstance();