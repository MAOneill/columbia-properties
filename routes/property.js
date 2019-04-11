const {showOneProperty, saveProperty, blankProperty} = require('../controllers/property');

const express = require('express');
const propertyRouter =  express.Router();

propertyRouter.post('/update',saveProperty);

propertyRouter.get('/add',blankProperty);

propertyRouter.post('/',showOneProperty);

//we need a get that will just retun to login...

module.exports = propertyRouter;