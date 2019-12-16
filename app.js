var express = require('express');
var app = express();
var db = require('./db');

var UserController = require('./user/UserController');
app.use('/users', UserController);


var ProfileController = require('./user/ProfileController');
app.use('/profiles', ProfileController);

module.exports = app;