var path = require('path');

module.exports = function(app, passport) {

    app.post('/signup',
        passport.authenticate('local-signup'),
        function(req, res) {
            res.json({ message: 'Signup OK', user: req.user.local.email });
        });

    app.post('/login',
        passport.authenticate('local-login'),
        function(req, res) {
            res.json({ message: 'Login OK', user: req.user.local.email });
        });

    app.post('/loggedin', function(req, res) {
       res.json({ message: req.isAuthenticated() ? 'loggedIn' : 'notLoggedIn' })
    });

    app.post('/logout', function(req,res) {
        req.logOut();
        res.json({ message: 'loggedOut' })
    })
};