//see comments for the web server in /hello-http/index.js
const http = require('http');
const fs = require('fs');  

const hostname = '127.0.0.1';
const port = 3000;

const querystring = require('querystring');

//pull in your restaurants model so we can use it:
//import my model class
const Restaurant = require('./models/restaurants');   //pulls in restaurants.js models
const User = require('./models/user.js');
//helper function - this is our middleware
//aka request handlers (similar to event handlers)
const server = http.createServer(async (req,res) => {
    const method = req.method;
    console.log(req.url);
    res.statusCode = 200;
    // res.setHeader('Content-type', 'text/plain');
    res.setHeader('Content-type', 'application/json');  //for our json data


            //if req.url = /restuarants - send them all restaurants
            //if req.url = /use3rs - send a list of users etc...
            //else - send a welcome message (your default index.html)
            if(req.url === "/restuarants") {
                //returns them each as an array of javascript objects
                //because we use AWAIT, the hander function (const server) is ASYNC!
                if (method === "GET"){
                    const allRestaurants = await Restaurant.getAll(); 
                    res.setHeader('Content-type', 'text/html');
    
                    //convert the array of objects into a string...
                    const restaurantsJSON = JSON.stringify(allRestaurants);
                    res.end(`<a href="/index">home</a><br/>` + restaurantsJSON);
                    }
                else if (method === "POST") {
                    res.end ("No soup POST for you");
                }
                else if (method === "PUT"){
                    res.end ("No soup PUT for you");
                }
                else if (method === "DELETE") {
                    res.end ("No soup DELETE for you");
                }
        
            }


    
    else if(req.url.startsWith("/users")) {
        const parts  = req.url.split("/");
        // console.log(parts);
        //get number
        // const userId = parts[parts.length-1];

        if (method === "GET"){
            if (parts.length > 3) {
                res.statusCode = 404;
                res.setHeader('Content-type', 'text/html');
                // res.end("404 resourse not found");
                res.end(` <a href="/index">home</a><br/> + <h1>404 resourse not found</h1><a href="./restuarants">restuarants</a><br><a href="./users">users</a>`);
    
            }
            else if (parts.length === 2)  {
             //get all data
                const allUsers = await User.getAll();
                const userJSON = JSON.stringify(allUsers);
                // res.end(userJSON);
                res.setHeader('Content-type', 'text/html');
    
                res.end(`<a href="/index">home</a><br/>` + userJSON);
    
            }
            else if (parts.length === 3) {
            //get just a particular user info
                const userId = parts[2];
                const theUser = await User.getById(parseInt(parts[2]));
                console.log(theUser);
                const userJSON = JSON.stringify(theUser);
                res.setHeader('Content-type', 'text/html');
                res.end(`<a href="/index">home</a><br>` + userJSON);
            }
        }
        else if (method === "POST"){
            let body = "";
            req.on('data', (chunk) => {
                body += chunk.toString();
            })
            req.on('end',() => {
                console.log("The body looks like this", body);
                const parsedBody = querystring.parse(body);
                const newUserId = User.add(parsedBody);  //this returns an id

                res.end ("You posted something")

            })

        }
        else if (method === "PUT"){
            res.end ("No soup PUT for you")
        }
        else if (method === "DELETE"){
            if (parts.length === 3) {
                const userId = parts[2];
                await User.delete(userId);
                //but you can only delete users that don't have 
                //records in the favorits or reviews table
                res.end(`{"message":"deleted user ${userId}}"`)
            }
            res.end ("No soup DELETE for you")
        }
        
    }
    else   {
        //format the response as json, b/c that is our content type.
        //this works:
        // res.end(` <a href="./restuarants">restuarants</a><br><a href="./users">users</a>`);
        // res.end(`{message:"Thank you for your patronage.  Please send bitcoin.}`);
        //but so does this:
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('index.html').pipe(res);
    }
});



//turn the server on
server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}.`);
});