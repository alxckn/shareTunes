/**
 * Created by alex on 2/10/16.
 */

var express = require('express');
var app = express();
var port = process.env.PORT || 8280;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan      = require('morgan');
var bodyParser  = require("body-parser");
var session     = require('express-session');

var configDB = require('./config/database.js');

app.use(morgan('dev'))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json());

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// required for passport
app.use(session({ secret: 'mySecretPass',
                saveUninitialized: true,
                resave: true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

var router = express.Router();
require('./app/routes')(app, passport, router);

app.use('/', router);

var server = app.listen(port);
console.log('App listening on ' + port);

var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
        socket.emit('hello', 'Hey from the other node server');
});