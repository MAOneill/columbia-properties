const { displayOneProperty, displayMainProperties, homePage, aboutPage, previousProperties, showMap, keyEmployees, contactPage} = require('../controllers/client');

const express = require('express');

const clientRouter =  express.Router();


clientRouter.get('/property/detail/:id',displayOneProperty);
    //will be in req.params.id

clientRouter.get('/mainproperties',displayMainProperties);
clientRouter.get('/home',homePage);
clientRouter.get('/about',aboutPage);
clientRouter.get('/previousproperties',previousProperties);
clientRouter.get('/map',showMap);
clientRouter.get('/employees',keyEmployees);
clientRouter.get('/contact',contactPage);


module.exports = clientRouter;

