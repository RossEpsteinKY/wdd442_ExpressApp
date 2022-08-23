const express = require('express');
const router = express.Router();
const {response} = require("express");
const session = require('express-session');
const {param} = require("express/lib/router");
const bodyParser = require('body-parser');
const querystring = require("querystring");
const request = require("request");
const app = express();

router.get('/login', (req,res) => {
    res.render('auth/login');
});

router.get('/deleteSession', (req,res) => {
    req.session.destroy();
    res.redirect('/auth/login');

});

router.get('/callback', async (req, res) => {
    // res.render('auth/login');

    const {code} = req.query;
    console.log('id',process.env.client_id);
    await request({

        uri: 'https://github.com/login/oauth/access_token',
        qs: {
            client_id: process.env.client_id,
            client_secret: process.env.secret,
            code
        }
    }, async (error, response,body) => {
        const { access_token } = querystring.parse(body);;
        req.session.access_token = access_token;
        res.redirect('/');
    });
});

module.exports = router;
