import { UserModel } from "../model/user.js";
import bcrypt from 'bcryptjs';
import {Strategy as LocalStrategy} from 'passport-local';

export const login = function(passport) {
    
    passport.use('login', new LocalStrategy({
        passReqToCallback : true 
    },
    function (req, username, password, done) {
        UserModel.findOne({username: username},
            function(err, user) {
                if (err) {
                    return done(err);
                }
    
                if (!user) {
                    console.log('Пользователь с таким именем не найден ' + username);
                    return done(null, false, req.flash('message', 'Пользователь с таким именем не найден.'));                 
                }
    
                if (!isValidPassword(user, password)) {
                    console.log('Неверный пароль');
                    return done(null, false, req.flash('message', 'Неверный пароль'));
                }
    
                return done(null, user);
            }
        );
    })
    );
    
    var isValidPassword = function(user, password) {
        return bcrypt.compareSync(password, user.password);
    }
};
