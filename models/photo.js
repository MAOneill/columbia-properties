//bring in the databases
const db = require('./conn');  //requre the conn.js file

//this will have all the fields as parameters
//static means all instance of the class have this function
class Photo {

    constructor (id, prop_id, url, photo_name) {
        this.id = id;
        this.propId = prop_id;
        this.url = url
        this.photoName = photo_name;
    }

    //gets all the photos for a specific property
static getAllforProperty(propid) {
    return db.any(`SELECT * from photo WHERE prop_id=$1`,[propid])
    .then((allphotos) => {
        const photoArray = [];
        allphotos.forEach((photo) => {
            const aphoto = new Photo(photo.id, photo.prop_id, photo.url, photo.photo_name);
            photoArray.push(aphoto);
        })
        return photoArray;
    })
    .catch((error) => {
        console.log(error);
    });
}

addPhoto(name, propid, url, photoname) {
    //this with get called AFTER we actually upload the file
    return db.result(`INSERT into photo (name, prop_id, url, photo_name)
    values
    ($1, $2, $3, $4)`,[name, propid, url, photoname]);

    //after an add or delete, we have to refresh the page.
}

deletePhoto(id){
    //remember if you call deletephoto to set the photo_id to null for the property or to some default?
    db.result(`DELETE from photo where id=$1`,[id])
    .catch((error) => {
        console.error(error);
    })

}

};
module.exports = Photo;
