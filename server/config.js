var express = require('express');
var redirect = require('./mobileRedirect.js');

module.exports = function(app){
    app.configure('development', function(){
        app.use(express.logger('dev'));
    });

    app.configure(function(){
        
        app.use(express.bodyParser());
        app.use(express.cookieParser());
        app.use(redirect('m/', 'api/'));
        app.use(app.router);
        app.use(express.static(__dirname + '/../www'));
        
    });
};