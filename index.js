const express = require('express');
const router = express.Router();
const {request, response} = require("express");
const {param} = require("express/lib/router");
const bodyParser = require('body-parser');
const app = express();

app.get('/',(req,res) =>{
    res.send("HOMEPAGE");
})

app.listen(5000);
console.log('listening on port 5000');
