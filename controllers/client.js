const Property = require('../models/property');
const Employee = require('../models/property');
const Media = require('../models/media');


async function displayOneProperty (req, res) {
    
    //id comes in as req.params.id

    const propertyData = await Property.getAPropertyForClient(req.params.id);

    // console.log("a bad property is", propertyData.message)

    //.message appears if you got an error returned
    if (propertyData.message) {
        res.redirect('/client/mainproperties');
    }
    else if (propertyData) {

        if (propertyData.show_mp === false) {
            res.redirect('/client/mainproperties');
        }
        else {  //process data
            const mediaData = await Media.getAllforPropertyClient(req.params.id);
            console.log(mediaData);
            console.log("The property id is", propertyData);
            res.render('view-property',{locals:{property:propertyData,media:mediaData}})

            // res.send("working on property display");
        }

    }
    else {
        res.redirect('/client/mainproperties');
    }
    
    //check that 1) the id exists and 2) the show_mp is true
    //otherwise redirect to mainproperty page
 
}

async function displayMainProperties (req, res) {

    //get all main properties from sql as js object
    const mainproperties = await Property.getMainPropertiesForClient();

    //sort that object appropriately!  
    //for this demo we will sort by state then name

    //when sorting by two things, I'm doing the inner sort first (name) and then the outer sort (state)
    //when I implement a sort field in the property table, i need to update this.

    mainproperties.sort(function(a,b){  
        if (a.state < b.state) {
            return -1;
        }
        else if (a.state > b.state){
            return 1;
        }
        else {  //same state - sort by name
            if (a.propertyName < b.propertyName) {
                return -1;
            }
            else if (a.propertyName > b.propertyName) {
                return 1;
            }
            else {
                return 0;
            }
        }
    });

    console.log("the main properties are: ", mainproperties);



    // res.send("working on it. sorted");
    res.render('user-main-property',{locals:{properties:mainproperties}});
}
//write all the rest

function homePage (req, res) {
    
}
function aboutPage (req, res) {

}
function previousProperties (req, res) {

}
function showMap (req, res) {

}
function keyEmployees (req, res) {

}
function contactPage (req, res) {

}

// module.exports = { displayOneProperty, displayMainProperties, homePage, aboutPage, previousProperties, showMap, keyEmployees, contactPage};
module.exports = { displayOneProperty, displayMainProperties, homePage, aboutPage, previousProperties, showMap, keyEmployees, contactPage};