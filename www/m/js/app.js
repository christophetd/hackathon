/*  Mobile
 * app.js defines the app object containing every every main models, collections and views.
 */

define(['backbone', 'Router'], function(){
    return window.app = {    
        
        init: function () {

            //We can now load jqm
            // Jquery mobile is ready
            
            // Instantiates a new Backbone.js Router
            var router = new (require('Router'));
            
            if(!Backbone.history.start()){
                window.location.hash = 'home';
            }
        }
    };
});

