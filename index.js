const express = require('express');
const {request, response} = require("express");
const {param} = require("express/lib/router");
const app = express();

app.get('/products',(request,response) =>{
    response.send("All products...");
})

app.post('/products',(request,response) =>{
    response.send("Created a new product...");
})

app.put('/products/:id',(request,response) =>{
    const id = request.params.id;
    response.send("Updated product " + id + "...");
})


app.listen(5000);
console.log('listening on port 5000');
