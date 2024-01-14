const express = require('express');
require('dotenv').config();
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/products');
const coloniasRoutes = require('./routes/colonias')
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session')
const passport = require('passport');
const flash = require('connect-flash')
require('./settings/passwords')



// Settings

const app = express();
// app.set('views', path.join(__dirname, 'views'));
// app.engine('ejs', engine);
// app.set('view engine', 'ejs');
app.use(express.json());
require('./passport/local-auth')
app.use(session({
    secret: process.env.SECRET,
    resave: false, 
    saveUninitialized: false 
}))

// Routes
app.use('/', require('./routes/index'))
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', coloniasRoutes);



// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.registroMensaje = req.flash('registroMensaje')
    app.locals.loginMensaje = req.flash('loginMensaje')
    next();
});




// MongoDB connection

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected to MongoDB Atlas')).catch((err) => console.log(err));


// port

const port = 3017

app.listen(port, () => console.log('server listening on port', port));