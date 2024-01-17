const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
})


passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
    

passport.use('local-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    
    const user = await User.findOne({ email: email })
    if (user) {
        return done(null, false, req.flash('registroMensaje', 'El Email está registrado'))
    } else {
        const newUser = new User()
        newUser.email = email
        newUser.password = newUser.encryptPassword(password)
        newUser.nombre = req.body.nombre
        newUser.apellido = req.body.apellido
        newUser.telefono = req.body.telefono
        await newUser.save();
        done(null, newUser);
    }
    
}));

passport.use('local-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    //Verificar si el usuario ya existe en la base de datos
    let user = await User.findOne({ email: email });
    if (!user) {
        return done(null, false, req.flash('loginMensaje', 'Este usuario no existe'));
    }
    //Si no hay un error y el usuario existe, comprobar la contraseña
    if (!user.validatePassword(password)) {
        return done(null, false, req.flash('loginMensaje', 'Contrasena incorrecta'));
    }
    done(null, user)
}));