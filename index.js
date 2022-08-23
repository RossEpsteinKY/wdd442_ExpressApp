const express = require('express');
const router = express.Router();
const {request, response} = require("express");
const {param} = require("express/lib/router");
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
require('dotenv').config();

const quizzesController = require('./src/controllers/quizzes');
const questionController = require('./src/controllers/questions');
const choicesController = require('./src/controllers/choices');
const authController = require('./src/controllers/auth');
const { isAuthenticated } = require("./src/middleware/auth");



app.use(session({
    saveUninitialized: false,
    secret: "T3s7!ng",
    cookie: {
        maxAge: 6000000,
    }
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.set('views',__dirname + '/src/views');
app.set('view engine','twig');

// app.get('/',(req,res) =>{
//     // res.send("HOMEPAGE");
//     res.render('home');
// })


app.use('/quizzes', quizzesController);
app.use('/questions', questionController);
app.use('/choices', choicesController);
app.use('/auth', authController);

app.get('/', isAuthenticated, async  (req,res) => {
    console.log('TOKEN', req.session.access_token);
    res.render('home');
});

app.listen(5000);
console.log('Listening on port 5000!');
