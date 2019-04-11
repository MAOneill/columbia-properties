//bring in the databases
const db = require('./conn');  //requre the conn.js file
const utils = require('../controllers/utils') ;  //utility file

//this will have all the fields as parameters
//static means all instance of the class have this function
class Property {
    constructor (id, property_name, street_address, county, city, state, zipcode, squarefeet,
        description, directions, contact_id, type, show_mp, show_di, show_pd, pd_description, year_opened,
        major_tenants, photo) {
            this.id = id;
            this.propertyName = property_name;
            this.streetAddress = street_address;
            this.county = county;
            this.city = city;
            this.state = state;
            this.zipcode = zipcode;
            this.squarefeet = squarefeet;
            this.description = description;
            this.directions = directions;
            this.contactId = contact_id;
            this.type = type;
            this.showMP = show_mp;
            this.showDI = show_di;
            this.showPD = show_pd;
            this.pdDescription = pd_description;
            this.yearOpened = year_opened;
            this.majorTenants = major_tenants;
            this.photo = photo;
        }

    static getAllProperties() {
        return db.any(`SELECT * from property`)
        //i  need to turn this into an array of property objects...
        .then((sqlProperties) => {
            const propertyArray = [];
            sqlProperties.forEach((prop) => {
                const propInstance = new Property(prop.id, prop.property_name, prop.street_address, prop.county, prop.city, prop.state, prop.zipcode, prop.squarefeet, prop.description, prop.directions, prop.contact_id, prop.type, prop.show_mp, prop.show_di, prop.show_pd, prop.pd_description, prop.year_opened, prop.major_tenants, prop.photo);   
                propertyArray.push(propInstance);
            })
            return propertyArray;
        })

    }
  
    
    static getById(id) {
        return db.one(`SELECT * FROM property WHERE id=$1`,[id])  //returns an object
            .then((prop)=> {
                const propertyInstance = new Property(prop.id, prop.property_name, prop.street_address, prop.county, prop.city, prop.state, prop.zipcode, prop.squarefeet, prop.description, prop.directions, prop.contact_id, prop.type, prop.show_mp, prop.show_di, prop.show_pd, prop.pd_description, prop.year_opened, prop.major_tenants, prop.photo);    
                return propertyInstance;    
            })
            .catch((error) => {
                console.log("error");
                return null;  //signal an invalid value
            });
    }
    //no 'static' since this is an instance method.  it belongs to the instance, not the class
    //this saves the property to the database
    save() {
        /*
        return db.result(`UPDATE property SET
        property_name='${this.propertyName}' where id = ${this.id}`);
        */
        return db.result(`UPDATE property SET 

        property_name = '${this.propertyName}',
        street_address = '${this.streetAddress}',
        county = '${this.county}',
        city = '${ this.city }',
        state = '${this.state}',
        zipcode = '${this.zipcode}',
        squarefeet = ${this.squarefeet},
        description = '${this.description}',
        directions = '${this.directions}',
        contact_id = ${this.contactId},
        type = '${this.type}',
        show_mp = ${this.showMP},
        show_di = ${this.showDI},
        show_pd = ${this.showPD},
        pd_description = '${this.pdDescription}',
        year_opened = ${this.yearOpened},
        major_tenants = '${this.majorTenants}',
        photo = ${this.photo}
            where id = ${this.id}`);

            
    }
    //WE NEED A DELETE - BUT IT NEEDS A VERIFY PAGE
    //actually i don't want a delete.  we can alwasy just show not to show, but we very rarely delete properties
};
module.exports = Property;
