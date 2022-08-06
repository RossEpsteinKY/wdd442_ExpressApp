const express = require('express');
const router = express.Router();
const {request, response} = require("express");
const {param} = require("express/lib/router");
const bodyParser = require('body-parser');
const app = express();

app.get('/quizzes',(req,res) =>{
    re;
})

app.post('/quizzes',(req,res) =>{
    response.send("Created a new quiz...");
})

app.put('/quizzes/:id',(req,res) =>{
    const id = request.params.id;
    response.send("Updated quiz " + id + "...");
})


