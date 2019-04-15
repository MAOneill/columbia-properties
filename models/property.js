//bring in the databases
const db = require('./conn');  //requre the conn.js file
const utils = require('../controllers/utils') ;  //utility file

//this will have all the fields as parameters
//static means all instance of the class have this function
class Property {
    constructor (id, property_name, street_address, county, city, state, zipcode, squarefeet,
        description, directions, contact_id, type, show_mp, show_di, show_pd, pd_description, year_opened,
        major_tenants, photo, mapx, mapy, sort_order) {
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
            this.mapx = mapx;
            this.mapy = mapy;
            this.sortOrder = sort_order;
        }

        //added sort - sort the main_prop = true, by name.  so the main properties will sort to the top
        //these are the ones that we edit the most.
        //i am not putting these on multiple pages.  we only have 85 as of 2019, so it doesn't make sense
        //to split it up
    static getAllProperties() {
        // return db.any(`SELECT * from property`)
        return db.any(`SELECT * from property ORDER by show_mp DESC, property_name`)
        //i  need to turn this into an array of property objects...
        .then((sqlProperties) => {
            const propertyArray = [];
            sqlProperties.forEach((prop) => {
                const propInstance = new Property(prop.id, prop.property_name, prop.street_address, prop.county, prop.city, prop.state, prop.zipcode, prop.squarefeet, prop.description, prop.directions, prop.contact_id, prop.type, prop.show_mp, prop.show_di, prop.show_pd, prop.pd_description, prop.year_opened, prop.major_tenants, prop.photo, prop.mapx, prop.mapy, prop.sort_order);   
                propertyArray.push(propInstance);
            })
            return propertyArray;
        })

    }
  
    
    static getById(id) {
        return db.one(`SELECT * FROM property WHERE id=$1`,[id])  //returns an object
            .then((prop)=> {
                const propertyInstance = new Property(prop.id, prop.property_name, prop.street_address, prop.county, prop.city, prop.state, prop.zipcode, prop.squarefeet, prop.description, prop.directions, prop.contact_id, prop.type, prop.show_mp, prop.show_di, prop.show_pd, prop.pd_description, prop.year_opened, prop.major_tenants, prop.photo, prop.mapx, prop.mapy, prop.sort_order);    
                return propertyInstance;    
            })
            .catch((error) => {
                console.log("error");
                return null;  //signal an invalid value
            });
    }

    //i am not going to use this.  using addNewBlank below
    addNew() {
        return db.result(`INSERT into property
        (property_name,street_address,county,city,state,zipcode,squarefeet,description,directions,contact_id,type,show_mp,show_di,show_pd,pd_description,year_opened,major_tenants,photo,mapx,mapy)
        values
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) returning id`,[this.propertyName,this.streetAddress, this.county, this.city, this.state,this.zipcode, this.squarefeet,this.description,this.directions, this.contactId,this.type,this.showMP, this.showDI, this.showPD,this.pdDescription,this.yearOpened, this.majorTenants, this.photo, this.mapx, this.mapy]);

        // ('${this.propertyName}','${this.streetAddress}','${this.county}','${ this.city }','${this.state}','${this.zipcode}', ${this.squarefeet},'${this.description}','${this.directions}', ${this.contactId},'${this.type}',${this.showMP}, ${this.showDI}, ${this.showPD},'${this.pdDescription}',${this.yearOpened},'${this.majorTenants}',${this.photo}, ${this.mapx},${this.mapy}) returning id` );
      
//         ('${this.propertyName}','${this.streetAddress}','${this.county}','${ this.city }','${this.state}','${this.zipcode}',
//  ${this.squarefeet},'${this.description}','${this.directions}', ${this.contactId},'${this.type}',${this.showMP}, ${this.showDI}, ${this.showPD},'${this.pdDescription}',${this.yearOpened},
// '${this.majorTenants}',${this.photo}, ${this.mapx},${this.mapy}) returning id` );
      
    }

    //this simply creates a new row in the property table with a default name.  everything else will be blank
    //call this for a new property, get the id, then populate the HTML page.
    static addNewBlank() {
        return db.result(`INSERT into property (property_name) values ('A New Property') returning id`);
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
        photo = ${this.photo},
        mapx = ${this.mapx},
        mapy = ${this.mapy},
        sort_order = ${this.sortOrder}
        
            where id = ${this.id}`);

            
    }
    //WE NEED A DELETE - BUT IT NEEDS A VERIFY PAGE
    //actually i don't want a delete.  we can alwasy just show not to show, but we very rarely delete properties


    static getMainPropertiesForClient(){
        //get all the properties where show_mp is true
        
        //this can remain as an array of objects from sql, but I did rename the variables to the javascript friendly
        //this sort isn't enough.  null comes before any value for sort_order.  so i need to do this in javascript.
        return db.any(`SELECT PR.id as id, PR.property_name as propertyName, PR.street_address as streetAddress, PR.county, PR.city, PR.state, PR.type, PR.zipcode, PH.url , PR.sort_order FROM  property as PR LEFT join photo as PH on PR.photo = PH.id where PR.show_mp = true ORDER BY PR.sort_order DESC, PR.state, propertyName`)
        // return db.any(`SELECT PR.id as id, PR.property_name as propertyName, PR.street_address as streetAddress, PR.county, PR.city, PR.state, PR.type, PR.zipcode, PH.url FROM  property as PR LEFT join photo as PH on PR.photo = PH.id where PR.show_mp = true`)
        //if photo id is null, then supply the 'no-image-url'  OR we can do this in HTML

    }

    //gets only properties that have a true show_mp value for GA
    static getGAPropertiesForMap() {
        return db.any(`SELECT PR.id as id, PR.property_name as propertyName, PR.street_address as streetAddress, PR.county, PR.city, PR.state, PR.zipcode , PR.type, TRIM(TO_CHAR(PR.squarefeet,'999,999,999,999')) as squarefeet, PR.mapx, PR.mapy FROM  property as PR  where PR.show_mp = true AND PR.state= 'GA' ORDER BY propertyName`);
    }

    static getAPropertyForClient(id){

        //restate the variable names...
        return db.one(`SELECT PR.id as propid, PR.property_name, PR.street_address, PR.county, PR.city, PR.state, PR.zipcode, TRIM(TO_CHAR(PR.squarefeet,'999,999,999,999')) as squarefeet, PR.description, PR.directions, PR.show_mp, PH.url, PH.photo_name, E.name as contactname, E.title, E.email, E.phone FROM property as PR LEFT join photo as PH on PR.photo = PH.id LEFT join employee as E on PR.contact_id = E.id  WHERE PR.id = $1 `,[id])
        .catch((error) => {
            console.log("the error is", error);
            return error;  //this will return a QueryResultError object

        });
    }

    
};
module.exports = Property;
