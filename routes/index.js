const express = require('express')
const router = express.Router();
const passport = require('passport')
const validator = require('validator')
const passwordSchema = require('../settings/passwords');



router.get('/', (req, res, next) => {
    res.render('index');
})

router.get('/registro', (req, res, next) => {
    res.render('registro')
})


function validarEmail(req, res, next) {
    const { email } = req.body;
    if (!validator.isEmail(email)) {
        res.status(400).send('El correo electrónico no es válido.');
    } else {
        next();
    }
}

function validatePassword(req, res, next) {
    const { password } = req.body;

    if (!passwordSchema.validate(password)) {
        res.status(400).send('La contraseña no cumple con los requisitos de seguridad.');
    } else {
        next();
    }
}

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

async function verificarEmail(req, res, next) {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).send('El correo electrónico ya está registrado.');
    } else {
        next();
    }
}

router.post('/registro', validatePassword, validarEmail, verificarEmail, passport.authenticate('local-signup', {
    successRedirect: '/perfil',
    failureRedirect: '/registro',
    passReqToCallback: true
}));



    router.get('/login', (req, res, next) => {
        res.render('login')
    })

    router.post('/login', passport.authenticate('local-signin', {
        successRedirect: '/perfil',
        failureRedirect: '/login',
        passReqToCallback: true
    }));

    router.get('/logout', (req, res, next) => {
        req.logOut();
        res.redirect('/')
    })



//Mostrar el perfil del usuario autenticado

    router.use((req, res, next) => {
        isAuthenticated(req, res, next);
        next();
    })

    router.get('/perfil', (req, res, next) => {
        res.render('perfil')
    });


  

    module.exports = router;