const Property = require('../models/property');

async function showOneProperty (req, res) {

    // console.log("the body propid is ", req.body.propid);
    //test that userid is in req.session ... if not - kick back to login
    if (req.session.userId) {

        //get all properties from database
        theProperty = await Property.getById(parseInt(req.body.propid));
        console.log('THE PROPERTY IS ', theProperty)
        //send the property.html page with all the details

        res.render('property',{locals:{userid:req.session.userid,property:theProperty}});
    }
    else {
        //there is no valid user - don't allow anything
        res.redirect('/login');
    }
    
}


module.exports = showOneProperty;