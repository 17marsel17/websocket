import { UserModel } from "../model/user.js";
import {signup} from './signup.js';
import {login} from './login.js';

export const initPassport = function(passport) {

    passport.serializeUser(function(user, done) {
        console.log('serializing user: ', user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        UserModel.findById(id, function(err, user) {
            console.log('deserializing user: ', user);
            done(err, user);
        });
    }); 

    login(passport);
    signup(passport);
}