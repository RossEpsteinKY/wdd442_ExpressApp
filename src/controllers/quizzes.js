const express = require('express');
const router = express.Router();
const {request, response} = require("express");
const {param} = require("express/lib/router");
const bodyParser = require('body-parser');
const app = express();
let quizzes = require('../models/quizzes.model');

router.get('/',(req,res) =>{
    // res.send('get quizzes');
    res.json(quizzes);
})


module.exports = router;


