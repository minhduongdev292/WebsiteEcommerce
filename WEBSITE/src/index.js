const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-Override');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const csrf = require('csurf');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const Sequelize = require('sequelize');



const app = express();
const port = 3000;

const csrfProtection = csrf({ cookie: true });
app.use(session({
  secret: 'mysupersecret', 
  resave: false,
  saveUninitialized: false,
  //store: new MongoStore({ mongoUrl:'mongodb://localhost:27017/sugar_dev'}),
  store: MongoStore.create ({ mongoUrl:'mongodb://localhost:27017/sugar_dev'}),
  cookie: { maxAge: 180 * 60 * 1000 }
  }));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());
app.use(cookieParser());


app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});


//import { BrowserRouter, Route, Link } from "react-router-dom";
const BrowserRouter = require("react-router-dom").BrowserRouter;
const Route = require("react-router-dom").Route;
const Link = require("react-router-dom").Link;

//React
const react = require('react');


const route = require('./routes');
const db = require('./db/server.js');
require('./db/passport.js');
const MongoClient = require('mongodb').MongoClient;
const router = require('./routes/users');
//Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

app.use(methodOverride('_method'));

//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine('hbs', handlebars({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
  }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


// Routes init
route(app);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
