/*
 * This is the only app router. It handles navigation and shows the proper views.
 */
define([
    'app',
    'util/PageManager',
    'views/Home',
    'views/EditParty',
    'views/ShowParty',
    'views/ResNotFound',
    'backbone'
], function(
    app,
    Manager,
    HomeView,
    EditView,
    ShowView,
    ResNotFoundView
){
    return Backbone.Router.extend({

        //Defines mapping between routes and methods
        routes: {
            "": "index",
            "new": "create",
            "edit/:id": "edit",
            "show/:id": "show"
        },

        //Called when the router is instanciated. 
        initialize: function () {
            
            if(!app) app = require('app');
            
            this.manager = new Manager('#mainContents');
            
            this.manager.registerPages({
                'home': new HomeView(),
                'resNotFound': new ResNotFoundView()
            });
        },
        
        index: function () {
            this.manager.changePage('home');
        },
        
        create: function(){
            // Creating an editView without parameters will create a new party
            this.manager.changePage(new EditView());
        },
        
        edit: function(id){
            
            // We pass an existing party to this view so that it will edit it.
            var party = app.parties.get(id);
            if(party){
                this.manager.changePage(new EditView({
                    model: party
                }));
            } else {
                this.manager.changePage('resNotFound');
            }
        },
        
        show: function(id){
            // We pass an existing party to this view so that it will edit it.
            var party = app.parties.get(id);
            if(party){
                this.manager.changePage(new ShowView({
                    model: party
                }));
            } else {
                this.manager.changePage('resNotFound');
            }
        }
    });
});
