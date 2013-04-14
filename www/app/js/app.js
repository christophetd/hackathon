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
            
            /* We need to know the parties already created before starting the app.
                However, this only makes sense if we can keep track of a user which is not
                yet implemented so we need to find out how to do all of this.
             */
            this.parties.fetch({
                success: function(){
                    var router = new (require('util/Router'));
                    
                    if(!Backbone.history.start()){
                        window.location.hash = '/';
                    }
                }
            });
        }
    };
});