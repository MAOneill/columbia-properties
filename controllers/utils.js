function escapeHtml (text) {
    var map = {
        '&' : '&amp',
        '<':'&lt',
        '>':'&gt',
        '"':'&quot',
        "'":'&#039'
    }
    return text.replace(/[&<>'"]/g,function(m) {
        return map[m];
    })
}

//this is for the tinymce data
//tiny mce already handles <, >, and &.  but 
//it adds its own VALID html that I don't want to 
//escape.
//but it doesn't handle quotes or apostrophes
function escapeQuotes (text) {
    var map = {
        '"':'&quot',
        "'":'&#039'
    }
    return text.replace(/['"]/g,function(m) {
        return map[m];
    })

}

//if the checked html field is 'on' then return a value of true
function convertCheckboxBoolean(field) {
    if (field === 'on') {
       return true;
    }
    else {
       return false;
    }
}

function covertToNull(field) {
    if (field) {
        return field;
    }
    else {
        return null;
    }


}
module.exports = {escapeHtml, convertCheckboxBoolean, covertToNull, escapeQuotes};