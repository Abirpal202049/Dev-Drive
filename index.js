require("dotenv").config();
require("./config/database").connect();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts')


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser())


const authRoute = require('./routes/auth')
app.use("/", authRoute);


module.exports = app;

