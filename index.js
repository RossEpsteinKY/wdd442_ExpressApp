const express = require('express');
const router = express.Router();
const {request, response} = require("express");
const {param} = require("express/lib/router");
const bodyParser = require('body-parser');
const app = express();

const quizzesController = require('./src/controllers/quizzes');

app.get('/',(req,res) =>{
    res.send("HOMEPAGE");
})

app.use('/quizzes', quizzesController);

app.listen(5000);
console.log('listening on port 5000');
