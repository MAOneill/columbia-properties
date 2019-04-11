const Property = require('../models/property');

async function displayAllProperties (req, res) {

    //test that userid is in req.session ... if not - kick back to login
    if (req.session.userId) {

        //get all properties from database
        allProperties = await Property.getAllProperties()
        //send the main.html page with all properties listed
        // console.log(allProperties);

        res.render('main',{locals:{userid:req.session.userId,properties:allProperties}});
    }
    else {
        //there is no valid user - don't allow anything
        res.redirect('/login');
    }
    
}

module.exports = displayAllProperties;