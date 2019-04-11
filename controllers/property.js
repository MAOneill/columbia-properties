const Property = require('../models/property');
const Employee = require('../models/employee');
const Photo = require('../models/photo');
const utils = require('./utils');

//master show property fucntion so i don't rewrite it 5 times...
async function showProperty(mymessage,newflag, req, res) {

    console.log("the body propid is ", req.body.propid);
    let allPictures = [];
    let theProperty = [];
    //this variable is essentiall global i think
    if (req.session.userId) {

        if (!newflag) {
        //get the properties from database
        theProperty = await Property.getById(parseInt(req.body.propid));

        //get pictures to select
        //if a new blank property, this is an empty array!
        allPictures = await Photo.getAllforProperty(req.body.propid);
        }
        console.log(allPictures);
        //if allpictures is blank - just send an empty object...
        //because this could happen too...
        if (!allPictures) {
            allPictures = [];
        }

        //get employees for select
        const allEmployees = await Employee.getAll();

        //send the property.html page with all the details
        res.render('property',{locals:{message:mymessage,userid:req.session.userid,property:theProperty,allEmployees,allPictures}});

    }
    else {
        //there is no valid user - don't allow anything
        res.redirect('/login');
    }


}

 function showOneProperty (req, res) {


    showProperty("nothing to say",false, req, res) ;

    // console.log("the body propid is ", req.body.propid);
    // //test that userid is in req.session ... if not - kick back to login
    // if (req.session.userId) {

    //     //get all properties from database
    //     theProperty = await Property.getById(parseInt(req.body.propid));
    //     // console.log('THE PROPERTY IS ', theProperty)
    //     //send the property.html page with all the details

    //     //get employees for select
    //     const allEmployees = await Employee.getAll();
    //     //get pictures to select
    //     let allPictures = await Photo.getAllforProperty(req.body.propid);

    //     console.log(allPictures);
    //     //if allpictures is blank - just send an empty object...
    //     if (!allPictures) {
    //         allPictures = {};
    //     }

    //     res.render('property',{locals:{message:"",userid:req.session.userid,property:theProperty,allEmployees,allPictures}});
    // }
    // else {
    //     //there is no valid user - don't allow anything
    //     res.redirect('/login');
    // }
    
}

 function blankProperty (req, res) {
    //show the property html form with all blanks
    //still check that the user is log in

    showProperty("Enter info and hit save",true, req, res)
    // if (req.session.userId) {

    //     // console.log('THE PROPERTY IS ', theProperty)
    //     //send the property.html page with all the details

    //     const allEmployees = await Employee.getAll();


    //     res.render('property',{locals:{message:"Enter info and hit Save",userid:req.session.userid,property:{},allEmployees}});
    // }
    // else {
    //     //there is no valid user - don't allow anything
    //     res.redirect('/login');
    // }


}

async function saveProperty (req, res) {
    //take all fields from form in req.body
    //convert check boxes to true/false

    const showmp = utils.convertCheckboxBoolean(req.body.showmp);
    const showdi = utils.convertCheckboxBoolean(req.body.showdi);
    const showpd = utils.convertCheckboxBoolean(req.body.showpd);

    //scrub any data with utility funciton

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

console.log("the property object after being int the form......");
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


    showProperty("Changes Saved",false, req, res);
    // if (req.session.userId) {

    //     //get all properties from database
    //     const theProperty = await Property.getById(parseInt(req.body.propid));
    //     //send the property.html page with all the details

    //     //get contact id list
        
    //     const allEmployees = await Employee.getAll();

    //     res.render('property',{locals:{message:"Changes Saved",userid:req.session.userid,property:theProperty,allEmployees}});
    // }
    // else {
    //     //there is no valid user - don't allow anything
    //     res.redirect('/login');
    // }



}    

else {
    //get the new id...
    const mynewprop = await updateProperty.addNew();
    console.log(mynewprop.rows[0].id);  
    console.log('THE SQL FORM THE INSERT IS', mynewprop);

    res.redirect('/main')
    
    //here we could just rediect to main....
    // showProperty("Property Added",false, req, res)
    // if (req.session.userId) {

    //     //get all properties from database
    //     theProperty = await Property.getById(parseInt(mynewprop.rows[0].id));
    //     //send the property.html page with all the details

    //     const allEmployees = await Employee.getAll();

    //     res.render('property',{locals:{message:"Property Added",userid:req.session.userid,property:theProperty,allEmployees}});
    // }
    // else {
    //     //there is no valid user - don't allow anything
    //     res.redirect('/login');
    // }



    }
//if the id is null - INSERT
//otherwise UPDATE
}


async function uploadImage (req, res) {
    //using express-fileupload - it will b4e in the req.files object
    // console.log("the property image is ", req.files.properyimage);
    // console.log("WE GET TOTHIS POINT");

    
        if (Object.keys(req.files).length == 0) {
          return res.status(400).send('No files were uploaded.');
        }
      
        let sampleFile = (req.files.properyimage ? req.files.properyimage : "bad_file_name.xxx");
    //   console.log(sampleFile.name);
        //get a unique number based on date and user id:
        let userid = (req.session.userId ? req.session.userId : 0).toString() ;
        let date = new Date();
        let seconds = parseInt(date.getTime() / 1000).toString();
        let fileName = userid + seconds + sampleFile.name;
        //i still need the file extension
        // let filenameParts = sampleFile.name.split('.');
        // console.log(filenameParts);
        // console.log(`The file type is ${filenameParts[filenameParts.length - 1]}`);
        // let extension = filenameParts[filenameParts.length - 1];
        // console.log(`the filename is   ${fileName}`);
        
        // let fileName = filenameParts[0] + userid + seconds + "." + extension;
        // console.log(fileName);

    //just use html formatting
    //   .+\.([jpg|jpeg|gif|png|JPG|JPEG|GIF|PNG]{3,4})$

        // Use the mv() method to place the file somewhere on your server
        // sampleFile.mv('./myuploadedfiles/needsunique.jpg', function(err) {
        sampleFile.mv(`./public/propertyphotos/${fileName}`, async function(err) {
          if (err) {

              return res.status(500).send(err);
          }
       
          //   res.send('File uploaded!');
  
          // save the data to the database
          await Photo.addPhoto(req.body.propid,`propertyphotos/${fileName}`, fileName) ;
          
          showProperty("Image uploaded",false, req, res)

      
        });

}



module.exports = {showOneProperty, saveProperty, blankProperty, uploadImage};