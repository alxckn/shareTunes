module.exports = function(app) {
    app.get('/test', function(req, res) {
        res.render('test');
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};