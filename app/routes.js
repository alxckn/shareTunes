module.exports = function(app) {
    app.get('/test', function(req, res) {
        res.render('index');
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};