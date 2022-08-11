const express = require('express');
const router = express.Router();
const {request, response} = require("express");
const {param} = require("express/lib/router");
const bodyParser = require('body-parser');
const app = express();
let questions = require('../models/questions.model');
app.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/',(req,res) =>{
    // res.send('get questions');
    res.json(questions);
})

router.get('/:id',(req,res) =>{
    try {
        const id = req.params.id;
        const quiz = questions.find(quiz => quiz.id == id )

        if(!quiz){
            throw new Error('QUIZ NOT FOUND');
        }
        res.json(quiz);
    }
    catch (e) {
        res.send("ERROR: UNABLE TO FIND QUIZ ID " + req.params.id, 404);
    }
})


router.post('/',(req,res) =>{
    const { id, question } = req.body;
    console.log('body',req.body);
    try {

        questions.push(
            {
                id: Number(id),
                question: question
            }

        );
        res.send('successfully updated');
    }
    catch (e) {
        res.send("ERROR: UNABLE TO FIND QUIZ ID " + req.params.id, 404);
    }
})


router.put('/:id',(req,res) =>{
    const id = Number(req.params.id);
    console.log('body',req.body);
    try {
        questions.map((q) => {
            if(id === q.id){
                    id: Number(id),
                    q.question = req.body.question
                }
            return q;
            }
        );
        res.json(questions);
        res.send('successfully updated quiz ' + id);
    }
    catch (e) {
        res.send("ERROR: UNABLE TO UPDATE QUIZ ID " + req.params.id, 404);
    }
})

router.delete('/:id',(req,res) =>{
    const id = Number(req.params.id);
    console.log('body',req.body);
    try {
        questions = questions.filter(q => q.id !== id);
        res.send('successfully deleted quiz ' + id);
    }
    catch (e) {
        res.send("ERROR: UNABLE TO DELETE QUIZ ID " + req.params.id, 404);
    }
})

module.exports = router;

