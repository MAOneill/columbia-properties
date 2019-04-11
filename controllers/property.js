const Property = require('../models/property');
const utils = require('./utils');

async function showOneProperty (req, res) {

    // console.log("the body propid is ", req.body.propid);
    //test that userid is in req.session ... if not - kick back to login
    if (req.session.userId) {

        //get all properties from database
        theProperty = await Property.getById(parseInt(req.body.propid));
        // console.log('THE PROPERTY IS ', theProperty)
        //send the property.html page with all the details

        res.render('property',{locals:{message:"",userid:req.session.userid,property:theProperty}});
    }
    else {
        //there is no valid user - don't allow anything
        res.redirect('/login');
    }
    
}

function blankProperty (req, res) {
    //show the property html form with all blanks
console.log('IS THIS GETTING CALLED???');
    //still check that the user is log in
    if (req.session.userId) {

        // console.log('THE PROPERTY IS ', theProperty)
        //send the property.html page with all the details

        res.render('property',{locals:{message:"Enter info and hit Save",userid:req.session.userid,property:{}}});
    }
    else {
        //there is no valid user - don't allow anything
        res.redirect('/login');
    }


}

async function saveProperty (req, res) {
    //take all fields from form in req.body
    //convert check boxes to true/false

    const showmp = utils.convertCheckboxBoolean(req.body.showmp);
    const showdi = utils.convertCheckboxBoolean(req.body.showdi);
    const showpd = utils.convertCheckboxBoolean(req.body.showpd);

    //scrub any data with utility funciton
    let photoid;
    if (req.body.photoid) {
        photoid = parseInt(req.body.photoid)
    }
    else {
        photoid = null;
    }

    //create an instance of a Property Object
const updateProperty = new Property(parseInt(req.body.propid), req.body.propertyname, req.body.streetaddress, req.body.county, req.body.city, req.body.state, req.body.zipcode, parseInt(req.body.squarefeet), req.body.description, req.body.directions, parseInt(req.body.contactid), req.body.type, showmp, showdi, showpd, req.body.pddescription, parseInt(req.body.yearopen), req.body.majortenants, photoid);   

console.log("the property object after being int he form......");
console.log(updateProperty);


//if the id is null - INSERT
//otherwise UPDATE

    //save to database using newProperty.save()
    await updateProperty.save()
    .catch((err) => console.log(err));

    //redisplay that property to the user with a message of 'changes saved'
    //i really want to just call my showOneProperty function above, but I cant change the message in the locals
    if (req.session.userId) {

        //get all properties from database
        theProperty = await Property.getById(parseInt(req.body.propid));
        //send the property.html page with all the details

        res.render('property',{locals:{message:"Changes Saved",userid:req.session.userid,property:theProperty}});
    }
    else {
        //there is no valid user - don't allow anything
        res.redirect('/login');
    }
}

module.exports = {showOneProperty, saveProperty, blankProperty};