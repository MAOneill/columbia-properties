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
    console.log("The req.body.photoid is ", req.body.photoid, typeof req.body.photoid);
    console.log("The req.body.contactid is ", req.body.contactid, typeof req.body.contactid);

    //convert numerica values to NUMERIC
    const id = utils.covertToNull(req.body.propid);
    const yearopen = utils.covertToNull(req.body.yearopen);
    const contactid = utils.covertToNull(req.body.contactid);
    const sqfeet = utils.covertToNull(req.body.squarefeet);
    const photoid = utils.covertToNull(req.body.photoid);


console.log("The id of the property is", id);
console.log(req.body.yearopen, typeof req.body.yearopen);


    //create an instance of a Property Object
const updateProperty = new Property(id, req.body.propertyname, req.body.streetaddress, req.body.county, req.body.city, req.body.state, req.body.zipcode, sqfeet, req.body.description, req.body.directions, contactid, req.body.type, showmp, showdi, showpd, req.body.pddescription, yearopen, req.body.majortenants, photoid);   

console.log("the property object after being int he form......");
console.log(updateProperty);


//the propid will be null or blank when adding a new property
//it will be populated when saving
if (req.body.propid) {

    //save to database using newProperty.save()
    console.log(("the propid is ", req.body.propid));

    await updateProperty.save()
    .catch((err) => console.log("SOMTHING BLEW UP", err));

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
else {
    //get the new id...
    const mynewprop = await updateProperty.addNew();
    console.log(mynewprop.rows[0].id);  
    console.log('THE SQL FORM THE INSERT IS', mynewprop);

    //redisplay that property to the user with a message of 'changes saved'
    //i really want to just call my showOneProperty function above, but I cant change the message in the locals
    if (req.session.userId) {

        //get all properties from database
        theProperty = await Property.getById(parseInt(mynewprop.rows[0].id));
        //send the property.html page with all the details

        res.render('property',{locals:{message:"Property Added",userid:req.session.userid,property:theProperty}});
    }
    else {
        //there is no valid user - don't allow anything
        res.redirect('/login');
    }



}
//if the id is null - INSERT
//otherwise UPDATE

}

module.exports = {showOneProperty, saveProperty, blankProperty};