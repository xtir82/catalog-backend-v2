import {Router} from 'express';
import { productManager } from './product.router.js';

const router = Router();

router.get('/home', productManager.renderProduct);

router.get('/register', (req, res) => {
    if (req.session.login) {
        res.redirect('/profile');
    } else {
        res.render('register');
    }
})

router.get('/login', (req, res) => {
    if (req.session.login) {
        res.redirect('/profile');
    } else {
        res.render('login');
    }
})

router.get('/profile', (req, res) => {
    if (!req.session.login) {
        res.redirect('/login');
    } else {
        res.render('profile', {user: req.session.user});
    }
})

export default router;