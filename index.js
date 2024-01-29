const express = require('express');
require('dotenv').config();
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/products');
const coloniasRoutes = require('./routes/colonias')
const indexRoutes = require('./routes/index')
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session')
const passport = require('passport');
const flash = require('connect-flash')
require('./settings/passwords')
const cors = require('cors')
const mongoose = require('mongoose')


// Settings


const app = express();
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200
}


app.use(cors(corsOptions))

app.use(passport.initialize());
app.use(passport.session());


app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');


app.use(express.json());
require('./passport/local-auth')


// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(flash());
app.get('/ruta', (req, res) => {
  res.json({
    registroMensaje: req.flash('registroMensaje'),
    loginMensaje: req.flash('loginMensaje'),
    // otros datos
  });
});

// Routes
app.use('/', indexRoutes)
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', coloniasRoutes);


// MongoDB connection

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => console.log(err));

  
// port

const port = process.env.PORT

app.listen(port, () => console.log('server listening on port', port));