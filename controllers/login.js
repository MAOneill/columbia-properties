//pulls in the user model
const User = require('../models/users');


function showLoginPage(req,res) {
    //no locals yet
    res.render('login',{locals:{message:'please log in'}});
}

async function verifyUser  (req, res) {
    //set session email
    console.log(req.body.userid);
    req.session.userid = req.body.userid;

    req.session.save( async () => { 

        //get the email from the post body
        // console.log(req.body.email);
        const theUser = await User.getById(`${req.body.userid}`);
    console.log(theUser);
        //if the user not found, redirect to the login page
        //in this app, they can't create login accounts
        if (theUser === null) {
            //you could set message...

            res.render('login',{locals:{message:'user does not exist'}});
        }
        else {  //user exists in user table

            //if the user exists, check password
            if (theUser.checkPassword(req.body.password)) {
                console.log("PASSWORD VALID");
                req.session.userId = theUser.id;

                //if valid, let user into main page
                req.session.save( () => {
                    // res.render('main',{locals:{userid:req.session.userId}});
                    console.log('trying to render main html');
                    res.redirect('/main');

                    // res.render('main',{locals:{userid:req.session.userId}});
                })
            }
            //wrong password
            else {
                //code to hash the password - only use this to create the hashes when testing. then remove
                // await theUser.setPassword(req.body.password);
                // console.log("saved the password");
                // await theUser.save();
                // console.log("updated the db");
        // res.render('login',{locals:{email:req.body.email, message:"password incorrect. please try again"}});  //this will be a Get
                res.render('login',{locals:{message:'password reset'}});
                }
        }
    })

    ;
}

module.exports = {showLoginPage, verifyUser}