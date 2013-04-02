/* 
 * app.js defines the app object containing every main models, collections and views.
 */


define([
    'backbone', 'Router', 'views/Home'],
    function(){

    return window.app = {
    
        // Instances
        collections: {},
        models: {},
        views: {},
        
        init: function () {
            
            /* Loading views */
            this.views.home = new (require('views/Home'))({el: '#mainContents'});
            
            var router = new (require('Router'));
            
            if(!Backbone.history.start()){
                window.location.hash = '/';
            }
        }
    };
});