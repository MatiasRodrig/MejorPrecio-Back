const express = require('express')
const router = express.Router();
const passport = require('passport')

router.get('/', (req, res, next) => {
    res.render('index');
})

router.get('/registro', (req, res, next) => {
    res.render('registro')
})

router.post('/registro', passport.authenticate('local-signup', {
    successRedirect: '/perfil',
    failureRedirect: '/registro',
    passReqToCallback: true
}))

router.get('/login', (req, res, next) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/perfil',
    failureRedirect: '/login',
    passReqToCallback: true
}));

router.get('/perfil', (req, res, next) => {
    res.render('perfil')
});


module.exports = router;