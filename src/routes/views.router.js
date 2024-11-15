import {Router} from 'express';
import { productManager } from './product.router.js';
import { sessionController } from '../controller/session.controller.js';

const router = Router();

router.get('/home', productManager.renderHome);
router.get('/realtimeproducts', productManager.renderRealTime);

router.get('/register', sessionController.renderRegister);
router.get('/login', sessionController.renderLogin);
router.get('/profile', sessionController.renderProfile);

export default router;