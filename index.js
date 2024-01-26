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


// Settings


const app = express();
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(cors())
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
app.use((req, res, next) => {
    app.locals.registroMensaje = req.flash('registroMensaje')
    app.locals.loginMensaje = req.flash('loginMensaje')
    next();
});

// Routes
app.use('/api', indexRoutes)
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', coloniasRoutes);


// MongoDB connection

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MongoDB Atlas');
    const coleccion = client.db("test").collection("products");
    // Aquí es donde se crea el índice TTL
    coleccion.createIndex(
      { "fecha_creacion": 1 }, 
      { expireAfterSeconds: 86400 }
    );
    client.close();
  }
});

// port

const port = process.env.PORT

app.listen(port, () => console.log('server listening on port', port));