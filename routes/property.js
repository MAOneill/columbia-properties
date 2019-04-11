const showOneProperty = require('../controllers/property');

const express = require('express');
const propertyRouter =  express.Router();


propertyRouter.post('/',showOneProperty);

//we need a get that will just retun to login...

module.exports = propertyRouter;