const displayAllProperties = require('../controllers/main');

const express = require('express');

const mainRouter =  express.Router();


mainRouter.get('/',displayAllProperties);


module.exports = mainRouter;