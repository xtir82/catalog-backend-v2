import Router from 'express';
import UserModel from "../model/user.model.js";
import passport from "passport";
import { sessionController } from '../controller/session.controller.js';

const router = new Router();

//JWT Register
router.post("/register",/*passport.authenticate("register", { session: false }),*/ sessionController.jwtRegister);
router.post("/login",/*passport.authenticate("register", { session: false }),*/ sessionController.jwtLogin);
router.get("/logout", sessionController.Logout);
router.get("/current", passport.authenticate("jwt", {session: false}), sessionController.jwtCurrent);

//Passport Login
/*router.post("/login",passport.authenticate("login", {}), async (req, res) => {
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }

    req.session.login = true;
    res.redirect("/profile");
})*/

//Github Version
router.get('/github',passport.authenticate('github',{scope: ['user:email']}), async (req, res) => {

})

router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/login'}), async (req, res) => {
    //Github strategy will return the user, then we will use it to set in the session object
    req.session.user = req.user;
    req.session.login = true;
    res.redirect('/profile');
})

//Passport Google
router.get("/google", passport.authenticate('google',{scope:['profile', 'email']}), (req, res) => {

})

router.get('/googlecallback', passport.authenticate('google', {failureRedirect:'/login'}), async (req,res)=>{
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/profile");
})



export default router;