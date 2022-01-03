require("dotenv").config();
require("./config/database").connect();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')


app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser())


const authRoute = require('./routes/auth')
app.use("/", authRoute);


module.exports = app;

