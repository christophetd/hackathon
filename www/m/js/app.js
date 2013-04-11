/*  Mobile
 * app.js defines the app object containing every every main models, collections and views.
 */

define(['backbone', 'util/Router'], function(){
    return window.app = {    
        
        init: function () {

            //We can now load jqm
            // Jquery mobile is ready
            
            // Instantiates a new Backbone.js Router
            var router = new (require('util/Router'));
            
            if(!Backbone.history.start()){
                window.location.hash = 'home';
            }
        }
    };
});

