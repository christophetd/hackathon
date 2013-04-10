/*
    Configures the server
*/

var express = require('express');
var redirect = require('./mobileRedirect.js');

module.exports = function(app){

    //Getting port from environment, defaults to 5000
    var port = process.env.PORT || 5000;
    app.set('port', port);
    
    //Setting log level for development
    app.configure('development', function(){
        app.use(express.logger('dev'));
    });

    //Express configuration
    app.configure(function(){
        
        app.use(express.bodyParser());
        app.use(express.cookieParser());
        app.use(redirect('m', ['api', 'common']));
        app.use(app.router);
        app.use(express.static(__dirname + '/../www'));
        
    });
    
    /* Enables in-browser unit testing in development */
    app.configure('development', function(){
        require('./unitTest.js')(app);
    });
    
};
