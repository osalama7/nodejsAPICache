var config = require('./config');
var http = require('http');

var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var MongoStore = require('connect-mongo');
var flash = require('connect-flash');


module.exports = function(db) {
    var app = express();
    var server = http.createServer(app);


    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } 

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    //create api routes here
    
    require('../app/route/fashionItems.server.route.js')(app);    
    return app;

    };
    
