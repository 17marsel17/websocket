import { UserModel } from "../model/user.js";
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from "passport-local";

export const signup = function(passport) {

    passport.use('signup', new LocalStrategy({
        passReqToCallback : true
    },
        function(req, username, password, done) {
    
            const findOrCreateUser = function() {
                UserModel.findOne({username: username}, (err, user) => {
                    if (err) {
                        console.log('Ошибка при регистрации: ', err);
                        return done(err);
                    }

                    const email = req.body.email;
                    const displayName = req.body.displayName;
    
                    if (user) {
                        console.log('Пользователь с таким логином уже существует: ' + username);
                        return done(null, false, req.flash('message','Пользователь с таким логином уже существует'));
                    } else {
                        var newUser = new UserModel({
                            username: username,
                            displayName: displayName,
                            password: createHash(password),
                            email: email
                        });
    
                        newUser.save((err) => {
                            if (err) {
                                console.log('Ошибка при сохранении пользователя: ', err);
                                throw err;
                            }
    
                            console.log('Пользователь успешно зарегистрирован');
                            return done(null, newUser);
                        });
                    }
                });
            }

            process.nextTick(findOrCreateUser);
        })
    );

    const createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    }
};
