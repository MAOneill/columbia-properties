const chai = require('chai');
const expect = chai.expect;  //grab this specific function
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();
//import the user model
const User = require("../models/users");
const bcrypt = require('bcryptjs');

// a very basic test to make sure you set the test file up correctly

describe('Sanity check', function () {
    it ('should be 2', function () {
        // assert.equal(2, 1+1);
        expect(1+1).to.equal(2);
    });
})


describe ('Users model', () => {
    //😃 happy path
    it('should be able to retrieve by LOGIN id', async () => {
        const theUser = await User.getById('harmon');
        expect(theUser).to.be.an.instanceOf(User);
    })
});
    // ☹️unhappy path
describe ('Users model unhappy path', () => {

    it('should error if there is no user for that id', async () => {
        const theUser = await User.getById('margaret');
        expect(theUser).to.be.null;
    });

});

describe ('Users model encrypt the password', () => {

    it('should encrypt the password', async () => {
        //get user with id 1
        //set their password field to "bacon" (and encrypt it)
        //compare their password to 'bacon' - it should be false
        const theUser = await User.getById('harmon');
            theUser.setPassword("bacon");
                console.log(theUser.password);
                expect(theUser.password).not.to.equal("bacon");  //the original equals 'password'
        //save the password in db
        
        console.log("CHECKING PASSWORDS WITH direct bcrypt in test.js");
        await theUser.save();
            const sameUser = await User.getById('harmon');
                expect(bcrypt.compareSync("bacon", sameUser.password)).is.true;  
                expect(bcrypt.compareSync("tofu",sameUser.password)).is.false;
        //or use the User.checkPassword() method
        console.log("CHECKING PASSWORDS WITH CHECKPASSWORD METHOD");
            expect(sameUser.checkPassword("bacon")).is.true;
            expect(sameUser.checkPassword("eggs")).is.false;
        });
});

/*
describe ('Todo table checks', () => {
    //get all todos
    it('should grab all todos for an id', async () => {
        const userToDos = await ToDo.getAllToDoForUser(6);
        // console.log(userToDos);
        expect(userToDos).to.be.lengthOf(1);
    });
    it('should retrieve one todo item', async () => {
        const aToDo = await ToDo.getById(3);
            expect(aToDo).to.be.an.instanceOf(ToDo);
    })
    it('should update to do with complete' , async () => {
        //make an todo item as done
        //check that it worked
        
        const aToDo = await ToDo.getById(3);
            console.log("The todo should be FALSE:".red, aToDo.complete);
            expect(aToDo.complete).is.false;

        await aToDo.markAsDone();
        
        const sameToDo = await ToDo.getById(3);
        console.log("The todo should be TRUE:".red, sameToDo.complete);
        expect(sameToDo.complete).is.true;

        console.log("hello".blue);
        await sameToDo.markAsUnDone();  //to set it back
        console.log("The todo should be FALSE:".red, sameToDo.complete);
    })
})
*/
