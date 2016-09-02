var config = require('./config'),
mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect('mongodb://localhost/fashion-cloud');

	//require  models here
    require('../app/model/fashionItem.server.model.js');

    return db;
};