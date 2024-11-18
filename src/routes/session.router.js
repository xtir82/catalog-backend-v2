import Router from 'express';
import UserModel from "../model/user.model.js";
import passport from "passport";
import { sessionController } from '../controller/session.controller.js';

const router = new Router();

//JWT 
router.post("/register", sessionController.jwtRegister);
router.post("/login", sessionController.jwtLogin);
router.get("/logout", sessionController.Logout);
router.get("/current", passport.authenticate("jwt", {session: false}), sessionController.jwtCurrent);

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