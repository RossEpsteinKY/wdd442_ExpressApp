const express = require('express');
const router = express.Router();
const {request, response} = require("express");
const {param} = require("express/lib/router");
const bodyParser = require('body-parser');
const app = express();

const quizzesController = require('./src/controllers/quizzes');
const questionController = require('./src/controllers/questions');
const choicesController = require('./src/controllers/choices');

app.set('views',__dirname + '/src/views');
app.set('view engine','twig');

app.get('/',(req,res) =>{
    // res.send("HOMEPAGE");
    res.render('home');
})

app.use('/quizzes', quizzesController);
app.use('/questions', questionController);
app.use('/choices', choicesController);

app.listen(5000);
console.log('listening on port 5000');
