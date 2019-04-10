//first require pg-promise can call it immediately which gives us a configured database connector
// const pgp = require('pg-promise')();


        //this willl allow you to see the sql log
        const pgp = require('pg-promise')({
            query: e => {
            //   console.log('QUERY: ', e.query);   //prints crap
            }  
          });
        
        
        const options = {
            host: 'localhost',
            database: 'todo-app'   //change this to your database name!!!
        
        };
        
        const db = pgp(options);
        
        module.exports = db;
        
        