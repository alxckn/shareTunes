module.exports = function(router, passport) {
    router.post('/signup',
        passport.authenticate('local-signup'),
        function(req, res) {
            res.status(201);
            res.send(req.user);
        });

    router.post('/login',
        passport.authenticate('local-login'),
        function(req, res) {
            res.status(200);
            res.send(req.user);
        });

    router.get('/loggedin', function(req, res) {
        if (req.isAuthenticated()) {
            res.status(200);
            res.send(req.user);
        }
        else {
            res.status(404);
            res.send('Not logged in');
        }
    });

    router.post('/logout', function(req,res) {
        req.logOut();
        res.status(200);
        res.send('Logged out');
    });
}
