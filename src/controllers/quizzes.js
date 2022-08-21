const express = require('express');
const router = express.Router();
const {request, response} = require("express");
const {param} = require("express/lib/router");
const bodyParser = require('body-parser');
const { Quizzes } = require('../models');
const app = express();
let quizzes = require('../../old_models/quizzes.model');
app.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/',async (req, res) => {
    // res.send('get quizzes');
    const quizzes = await Quizzes.findAll()

    res.render('quiz-list',{quizzes});

})

router.get('/:id',async (req, res) => {

    try {
        const id = req.params.id;
        const quiz = await Quizzes.findByPk(id)
        if (!quiz) {
            throw new Error('QUIZ NOT FOUND');
        }
        res.render('quiz',{quiz});
        return;
    } catch (e) {
        res.send("ERROR: UNABLE TO FIND QUIZ ID " + req.params.id, 404);
    }
})


router.post('/',async (req, res) => {
    console.log('body', req.body);
    try {

        const name = req.body;
        const quizzes = await Quizzes.create(name)
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
        const name = req.body.name;

        const quizToUpdate = await Quizzes.update({ name }, {
            where: { id }
        })

        console.log('this',quizToUpdate)
        res.send('successfully updated quiz ' + id);
    } catch (e) {
        res.send("ERROR: UNABLE TO UPDATE QUIZ ID " + req.params.id, 404);
    }
})

router.delete('/:id',async (req, res) => {
    const id = Number(req.params.id);
    console.log('id',id);
    try {
        await Quizzes.destroy({
            where: { id }
        })
        res.send('successfully deleted quiz ' + id);
    } catch (e) {
        res.send("ERROR: UNABLE TO DELETE QUIZ ID " + req.params.id, 404);
    }
})

module.exports = router;


