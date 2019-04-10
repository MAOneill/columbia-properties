//bring in the databases
const db = require('./conn');  //requre the conn.js file
const bcrypt = require('bcryptjs');

//this will have all the fields as parameters
//static means all instance of the class have this function
class User {
    constructor (id, name, login_id, password) {
        this.id = id;
        this.name = name;   
        this.loginId = login_id;
        this.password = password;
    } 
    static getById(loginId) {
        //db.ANY always returns an array
        // return db.any(`SELECT * FROM users WHERE id=${id}`);  //returns array w/ object
        //instead use db.ONE when you are returning ONE thing
        return db.one(`SELECT * FROM users WHERE login_id='${loginId}'`)  //returns an object
            .then((userData)=> {

                const userInstance = new User(userData.id, userData.name, userData.login_id, userData.password);    
                return userInstance;    
            })
            .catch((error) => {
                console.log("error");
                return null;  //signal an invalid value
            });
    }
    //no 'static' since this is an instance method.  it belongs to the instance, not the class
    save() {
        return db.result(`UPDATE users SET 
                    name = '${this.name}',
                    login_id ='${this.loginId}',
                    password = '${this.password}'
                     where id = ${this.id}`);
    }
    setPassword(password) {
        this.password = bcrypt.hashSync(password, 10);  //10 is my salt
    }
    checkPassword(password) {
        //returns true or false
        console.log(`comparing passwords`);
        return bcrypt.compareSync(password,this.password);
    }
};
module.exports = User;
