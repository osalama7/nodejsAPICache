
var mongoose = require('./config/mongoose');
var express = require('./config/express');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var db = mongoose();
var app = express(db);

var port = (3000);

app.listen(port);

module.exports = app;

console.log('Server running on port ' + port);
