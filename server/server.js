/**
 * Created by alex on 2/10/16.
 */

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require("body-parser");
var port = process.env.PORT || 8280;

// For test purpose
app.set('view engine', 'ejs');

app.use(morgan('combined'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json());

require('./app/routes')(app);

var server = app.listen(port);
console.log('App listening on '+port);

var io = require('socket.io').listen(server);

io.on('connection', function(socket) {

        socket.emit('hello', 'Bonjour petit nouveau');
});