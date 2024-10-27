import passport from 'passport';
import local from 'passport-local';
import UserModel from "../model/user.model.js";
import { createHash, isValidPassword } from "../utils/utils.js";
import userModel from "../model/user.model.js";
import GitHubStrategy from "passport-github2";

import GoogleStrategy from "passport-google-oauth20";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        //Le indicamos al sistema que queremos acceder al objeto resquest
        usernameField: 'email'
        //Como no tenemos campo usuario le enviamos el email
    }, async (req, username, password, done) => {
        const {first_name, last_name, age, email} = req.body;

        try {
            //Validamos si existe el usuario
            let user = await UserModel.findOne({email: email});
            if (!user) {
                return done(null, user)
            } else {
                let newUser = await UserModel.create({first_name, last_name, age, email, password: createHash(password)});
                return done(null, newUser);
            }
        } catch(error) {
            return done(error);
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
    }, async (email, password, done) => {
        try {
            //Validamos si existe el usuario
            let user = await UserModel.findOne({email});
            if (!user) {
                return done(null, false)
            }
            //Si existe el use validamos el password
            if(!isValidPassword(password, user)) {
                return done(null, false);
            }
            return done(null, user);


        } catch (e) {
            return done(e);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById({_id: id});
        done(null, user);
    })

    //Github Login Passport
    passport.use("github", new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/session/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        console.log("Profile",profile); //Hacemos print para validar

        try {
            let user = await UserModel.findOne({email: profile._json.email});
            if (!user) {
                let newUser = await UserModel.create({
                    first_name: profile._json.name,
                    last_name: '',
                    age: '',
                    email: profile._json.email,
                    password: ''
                })
                done(null, newUser);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }))

    passport.use("google", new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/session/googlecallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await UserModel.findOne({email: profile._json.email});
            if (!user) {
                let newUser = {
                    first_name: profile._json.given_name,
                    last_name: profile._json.family_name,
                    age: 37,
                    email: profile._json.email,
                    password: ''
                }

                let result = await UserModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }))
}

export default initializePassport;