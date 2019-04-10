const {showLoginPage, verifyUser} = require('../controllers/login');

const express = require('express');

const loginRouter =  express.Router();


loginRouter.get('/',showLoginPage);

loginRouter.post('/',verifyUser);


module.exports = loginRouter;