function logout(req, res) {
    //delete the session file!
    //because I want to check that the user id exists before any other edits
    console.log("destroying the sessions file");
    req.session.destroy(() => {
        // res.clearCookie(options.name);
        res.clearCookie('my.connect.sid');
        res.redirect('/login');
    });
    //and send the user back to login
}


module.exports = logout;
