require('dotenv').config();

const express = require('express');
const app = express();

//this will hide that we are using express in our html headers
//security meausre
const helmet = require('helmet');
app.use(helmet());

//for rendering html pages to user from client
const es6Renderer = require('express-es6-template-engine');
app.engine('html',es6Renderer);
app.set('views','./views');
app.set('view engine','html');


//to save values to session folder
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const options = {
    store: new FileStore(),
    secret: process.env.SESSION_SECRET,
    name: 'my.connect.sid'
}
//added the name so we can delete cookies
app.use(session ( options));

//this allows you to view things in the public directory
//images, css, and client side javascript have to be  in public

app.use(express.static('public'))

const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const mainRouter = require('./routes/main');
const propertyRouter = require('./routes/property');

//allows form parameters values to be stored in req.body on post
app.use(express.urlencoded({extended:true}));

//if logout is clicked from any page 
//this will delete the session variables
app.use('/logout',logoutRouter);

//tells where to process which http request
app.use('/login',loginRouter);

app.use('/main',mainRouter);

app.use('/property',propertyRouter);

//catch all
app.use('*', (req, res) => {
    res.status('404').send('We do not have a page for that yet.');
});


app.listen(process.env.PORT ,() => {
// app.listen(3600 ,() => {
    console.log(`columbia prop app running on port: ${process.env.PORT}.`);
});

