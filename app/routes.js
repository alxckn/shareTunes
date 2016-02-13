var path = require('path');

module.exports = function(app) {
    app.get('/test', function (req, res) {
        res.send('Hello World!');
    });

    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });
};