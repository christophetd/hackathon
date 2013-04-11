/* 
 * app.js defines the app object containing every main models, collections and views.
 */


define([
    'collections/Parties',
    'backbone', 'util/Router', 'views/Home'],
    function(Parties){

    return window.app = {
        
        init: function () {
        
            this.parties = new Parties();
            
            var router = new (require('util/Router'));
            
            if(!Backbone.history.start()){
                window.location.hash = '/';
            }
        }
    };
});