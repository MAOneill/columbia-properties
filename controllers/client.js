const Property = require('../models/property');
const Employee = require('../models/property');


async function displayOneProperty (req, res) {

 
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