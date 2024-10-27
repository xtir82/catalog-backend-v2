import { connect } from 'mongoose';
import 'dotenv/config';

connect(process.env.MONGODB_URI, {dbName: 'catalog-app-db'})
.then(() => console.log('Connected to DB'))
.catch(err => console.log('Error connecting to DB', err));
