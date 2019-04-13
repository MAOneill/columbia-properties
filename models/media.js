//bring in the databases
const db = require('./conn');  //requre the conn.js file

class Media {
 
    constructor (id, prop_id, url, file_title, display) {
        this.id = id;
        this.propId = prop_id;
        this.url = url;
        this.fileTitle = file_title;
        this.display = display;
    }

    //gets all the media for a specific property
    //in a javascript array of objects
static getAllforProperty(propid) {
    return db.any(`SELECT * from media WHERE prop_id=$1`,[propid])
    .then((allmedia) => {
        const meidaArray = [];
        allmedia.forEach((media) => {
        
            const amedia = new Media(media.id, media.prop_id, media.url, media.file_title, media.display);
            meidaArray.push(amedia);
        })
        return meidaArray;
    })
    .catch((error) => {
        console.log(error);
    });
}

static getAllforPropertyClient(propid) {
    return db.any(`SELECT * from media WHERE prop_id=$1 AND display=true`,[propid])
    .catch((error) => {
        console.log(error);
    })
}

updateMedia() {

    //the user can  only update the display name or the display boolean field
    return db.result(`UPDATE media SET
        file_title = '${this.fileTitle}',
        display = ${this.display}
        where id = ${this.id}`);

}

static setAllMediaFalse(propid) {
    return db.result(`UPDATE media SET display = false where prop_id = $1`,[propid]);
}
static setDisplayTrue(id) {
    return db.result(`UPDATE media SET display = true where id = $1`, [id]);
}

//this only gets alled AFTER the file has been saved to the /public/mediafiles
static addMedia(propid, url, filetitle, display) {
    //this with get called AFTER we actually upload the file
    return db.result(`INSERT into media (prop_id, url, file_title, display)
    values
    ($1, $2, $3, $4)`,[propid, url, filetitle, display]);

    //after an add or delete, we have to refresh the page.
}

static deleteMedia(id){
    return db.result(`DELETE from media where id=$1`,[id])
    .catch((error) => {
        console.error(error);
    })

}

};
module.exports = Media;
