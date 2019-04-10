const logout = require('../controllers/logout');

const express = require('express');

const logoutRouter =  express.Router();

//for any redirect to /logout, delete the sessions!
logoutRouter.get('/',logout);



module.exports = logoutRouter;