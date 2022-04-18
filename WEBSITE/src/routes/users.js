const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');
const Product = require('../app/models/Product');
const User = require('../app/models/User');

const userController = require('../app/controllers/UserController');


const csrfProtection = csrf();
router.use(csrfProtection);


router.get('/profile', isLoggedIn, function (req, res, next) {
    res.render('users/profile');
});

router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function (req, res, next){
    next();
});

router.get('/signup', userController.signup);

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup',
    failureFlash: true
}));

router.get('/signin', userController.signin);

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signin',
    failureFlash: true
}));


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
