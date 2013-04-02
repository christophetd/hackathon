/*
 * This is the only app router. It handles navigation and shows the proper views.
 */
define([
    'app',
    'views/Home',
    'backbone'
], function(
    app,
    HomeView
){
    return Backbone.Router.extend({

        //Defines mapping between routes and methods
        routes: {
            "": "index"
        },

        //Called when the router is instanciated. 
        initialize: function () {
            if(!app) app = require('app');
        },
        
        index: function () {
            var currentView = this.currentView;
            
            app.views.home.render();
        }
    });
});
