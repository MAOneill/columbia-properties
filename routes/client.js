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
// clientRouter.get('/services',servicespage);
// clientRouter.get('/retail',retailpage);
// clientRouter.get('/develop',developmentpage);
// clientRouter.get('/manage',managementpage);
// clientRouter.get('/leasing',leasingpage);
// clientRouter.get('/tenant-rep',tenantreppage);
// clientRouter.get('/investment',investmentpage);


module.exports = clientRouter;

