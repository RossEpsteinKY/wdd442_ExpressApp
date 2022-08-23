const express = require('express');
const router = express.Router();
const {request, response} = require("express");
const {param} = require("express/lib/router");
const bodyParser = require('body-parser');
const app = express();
let choices = require('../../old_models/choices.model');
const {Choices, Quizzes} = require("../models");
const {isAuthenticated} = require("../middleware/auth");
app.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


router.get('/', isAuthenticated,async (req, res) => {
    // res.send('get choices');
    const choices = await Choices.findAll()

    res.render('choices/index',{choices});
})

router.get('/new', isAuthenticated, async (req,res) => {
    res.render('choices/create')
})

router.get('/:id/show',isAuthenticated, async (req, res) => {

    try {
        const id = req.params.id;
        const choice = await Choices.findByPk(id)
        console.log(choice);
        if (!choice) {
            throw new Error('CHOICE NOT FOUND');
        }
        res.render('choices/show',{choice});
        return;
    } catch (e) {
        res.send("ERROR: UNABLE TO FIND CHOICE ID " + req.params.id, 404);
    }
})

router.get('/:id', isAuthenticated, async (req, res) => {

    try {
        const id = req.params.id;
        const choice = await Choices.findByPk(id)
        if (!choice) {
            throw new Error('CHOICE NOT FOUND');
        }
        res.json(choice);
        return;
    } catch (e) {
        res.send("ERROR: UNABLE TO FIND CHOICE ID " + req.params.id, 404);
    }
})


router.post('/', isAuthenticated, async (req, res) => {
    console.log('body', req.body);
    try {

        const choice = req.body;
        const choices = await Choices.create(choice)
        // res.json(choice);
        res.redirect(`/choices/${choices.id}/show`)
    } catch (e) {
        res.send("ERROR: UNABLE TO FIND CHOICE ID " + req.params.id, 404);
    }
})
router.get('/:id/edit',isAuthenticated, async (req, res) => {

    try {
        const id = req.params.id;
        const choice = await Choices.findByPk(id)
        if (!choice) {
            throw new Error('CHOICE NOT FOUND');
        }
        res.render('choices/edit',{choice});
        return;
    } catch (e) {
        res.send("ERROR: UNABLE TO FIND QUIZ ID " + req.params.id, 404);
    }
})

router.post('/:id/edit',isAuthenticated, async (req, res) => {

    try {
        const id = Number(req.params.id);
        console.log('id',id);
        console.log('body', req.body);
        const choice = req.body.choice;

        const choiceToUpdate = await Choices.update({ choice }, {
            where: { id }
        })

        console.log('this',choice);
        // res.send('successfully updated quiz ' + id);
        res.redirect(`/choices/${id}/show`);
    } catch (e) {
        res.send("ERROR: UNABLE TO UPDATE QUIZ ID " + req.params.id, 404);
    }
})


router.put('/:id', isAuthenticated, async (req, res) => {

    try {
        const id = Number(req.params.id);
        console.log('body', req.body);
        const choice = req.body.choice;

        const choiceToUpdate = await Choices.update({ choice }, {
            where: { id }
        })

        console.log('this',choiceToUpdate)
        res.send('successfully updated choice ' + id);
    } catch (e) {
        res.send("ERROR: UNABLE TO UPDATE CHOICE ID " + req.params.id, 404);
    }
})

router.delete('/:id', isAuthenticated,async (req, res) => {
    const id = Number(req.params.id);
    console.log('id',id);
    try {
        await Choices.destroy({
            where: { id }
        })
        res.send('successfully deleted choice ' + id);
    } catch (e) {
        res.send("ERROR: UNABLE TO DELETE CHOICE ID " + req.params.id, 404);
    }
})

router.get('/:id/delete',isAuthenticated, async (req, res) => {
    const id = Number(req.params.id);
    console.log('id',id);
    try {
        await Choices.destroy({
            where: { id }
        })
        res.redirect('/choices');
    } catch (e) {
        res.send("ERROR: UNABLE TO DELETE CHOICE ID " + req.params.id, 404);
    }
})

module.exports = router;


