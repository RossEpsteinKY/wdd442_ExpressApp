const express = require('express');
const router = express.Router();
const {request, response} = require("express");
const {param} = require("express/lib/router");
const bodyParser = require('body-parser');
const querystring = require("querystring");
const app = express();

router.get('/login', (req,res) => {
    res.render('auth/login');
});

router.get('/callback', async (req, res) => {
    // res.render('auth/login');

    const {code} = req.query;

    await request({
        uri: 'https://github.com/login/oauth/access_token',
        qs: {
            client_id: process.env.client_id,
            client_secret: process.env.secret,
            code
        }
    }, async (error, response,body) => {
        const { access_token } = querystring.parse(body);
    })
});

module.exports = router;
