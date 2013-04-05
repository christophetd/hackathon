/*  Mobile
 * app.js defines the app object containing every every main models, collections and views.
 */

define([
    'backbone', 'Router','jqm', 'jqmconfig', 'views/Home', 'views/Share', 'views/Search'],

    function(){

    return window.app = {    
        
        // Instances
        collections: {},
        models: {},
        views: {},
        
        init: function () {
            
            /* Loading views */
            //this.views.home = new (require('views/home'))({});

            console.log('document ready');
            var router = new (require('Router'));
            
            if(!Backbone.history.start()){
                window.location.hash = '/m';
            }
        }
    };
});
