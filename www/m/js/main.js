/* Mobile
 * main.js is the only file explicitly loaded by require (see index.html)
 * It will load every main classes needed by app to initialize.
 * One doesn't need to specify here sub-dependencies.
*/

requirejs.config({
    paths: {
        'socket.io': '/socket.io/lib/socket.io',
        'underscore': '/common/js/lib/underscore',
        'backbone': '/common/js/lib/backbone',
        'jqm': '/m/js/jquery.mobile-1.3.0.min',
        'jqmconfig': 'm/js/jqm-config'
        
    }
});


require([
    "jquery",
    "app"],
    
    /*
        The arguments of the callback function are the required objects 
        in the same order as in the list above. Therefore, we retreive jquery
        first, then the app object.
    */
    function($, app) {
    
        /* We can still use jquery to make sure the dom is completely loaded even though
            it's very unlikely it isn't already loaded. */
        $(function() {
            //Initializing app
            app.init();
        });
});