const express = require('express');
const router = express.Router();
const {request, response} = require("express");
const {param} = require("express/lib/router");
const bodyParser = require('body-parser');
const app = express();
let choices = require('../models/choices.model');
app.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/',(req,res) =>{
    // res.send('get choices');
    res.json(choices);
})

router.get('/:id',(req,res) =>{
    try {
        const id = req.params.id;
        const choice = choices.find(choice => choice.id == id )

        if(!choice){
            throw new Error('choice NOT FOUND');
        }
        res.json(choice);
    }
    catch (e) {
        res.send("ERROR: UNABLE TO FIND choice ID " + req.params.id, 404);
    }
})


router.post('/',(req,res) =>{
    const { id, name } = req.body;
    console.log('body',req.body);
    try {

        choices.push(
            {
                id: Number(id),
                name: name
            }

        );
        res.send('successfully updated');
    }
    catch (e) {
        res.send("ERROR: UNABLE TO FIND choice ID " + req.params.id, 404);
    }
})


router.put('/:id',(req,res) =>{
    const id = Number(req.params.id);
    console.log('body',req.body);
    try {
        choices.map((q) => {
            if(id === q.id){
                    id: Number(id),
                    q.name = req.body.name
                }
            return q;
            }
        );
        res.json(choices);
        res.send('successfully updated choice ' + id);
    }
    catch (e) {
        res.send("ERROR: UNABLE TO UPDATE choice ID " + req.params.id, 404);
    }
})

router.delete('/:id',(req,res) =>{
    const id = Number(req.params.id);
    console.log('body',req.body);
    try {
        choices = choices.filter(q => q.id !== id);
        res.send('successfully deleted choice ' + id);
    }
    catch (e) {
        res.send("ERROR: UNABLE TO DELETE choice ID " + req.params.id, 404);
    }
})

module.exports = router;


