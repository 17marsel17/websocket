import express from 'express';
import passport from 'passport';

export const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', {message: req.flash('message')});
});

router.get('/me', (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('api/user/login');
    }
    next();
    },
    (req, res) => {
        res.render('profile', {user: req.user});
    }
);

router.post('/login', passport.authenticate('login', {
        successRedirect: '/api/user/me',
        failureRedirect: '/api/user/login',
        failureFlash: true
    })
);

router.get('/signup', (req, res) => {
    res.render('signup', {message: req.flash('message')});
})

router.post('/signup',
    passport.authenticate('signup', {
        successRedirect: '/api/user/me',
        failureRedirect: '/api/user/signup',
        failureFlash: true
    })
);

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/api/user/login')
    })
});