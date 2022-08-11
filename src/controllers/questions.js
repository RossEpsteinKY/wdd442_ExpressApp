const express = require('express');
const router = express.Router();
const {request, response} = require("express");
const {param} = require("express/lib/router");
const bodyParser = require('body-parser');
const app = express();
let questions = require('../../old_models/questions.model');
const {Questions} = require("../models");
app.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/',async (req, res) => {
    // res.send('get questions');
    const questions = await Questions.findAll()

    res.json(questions);
})

router.get('/:id',async (req, res) => {

    try {
        const id = req.params.id;
        const question = await Questions.findByPk(id)
        if (!question) {
            throw new Error('QUIZ NOT FOUND');
        }
        res.json(question);
        return;
    } catch (e) {
        res.send("ERROR: UNABLE TO FIND QUIZ ID " + req.params.id, 404);
    }
})


router.post('/',async (req, res) => {
    console.log('body', req.body);
    try {

        const {question} = req.body;
        const questions = await Questions.create({question})
        // res.json(quiz);
        res.send('successfully created');
    } catch (e) {
        res.send("ERROR: UNABLE TO FIND QUIZ ID " + req.params.id, 404);
    }
})


router.put('/:id',async (req, res) => {

    try {
        const id = Number(req.params.id);
        console.log('body', req.body);
        const question = req.body.question;

        const questionToUpdate = await Questions.update({ question }, {
            where: { id }
        })

        console.log('this',questionToUpdate)
        res.send('successfully updated quiz ' + id);
    } catch (e) {
        res.send("ERROR: UNABLE TO UPDATE QUIZ ID " + req.params.id, 404);
    }
})

router.delete('/:id',async (req, res) => {
    const id = Number(req.params.id);
    console.log('id',id);
    try {
        await Questions.destroy({
            where: { id }
        })
        res.send('successfully deleted quiz ' + id);
    } catch (e) {
        res.send("ERROR: UNABLE TO DELETE QUIZ ID " + req.params.id, 404);
    }
})

module.exports = router;


