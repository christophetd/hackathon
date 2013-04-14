/*
 * This is the only app router. It handles navigation and shows the proper views.
 */
define([
    'app',
    'util/PageManager',
    'views/HomePage',
    'views/MusicPage',
    'views/SearchPage',
    'views/ResNotFoundPage',
    'backbone'
], function(
    app,
    Manager,
    HomePage,
    MusicPage,
    SearchPage,
    ResNotFoundPage
){
    return Backbone.Router.extend({

        //Defines mapping between routes and methods
        routes: {
            
            "": "index",
            "new": "create",
            "edit/:id": "edit",
            "party": "party",
            "music": "music",
            "search/:query": "search"
        },

        //Called when the router is instanciated. 
        initialize: function () {
            
            if(!app) app = require('app');
            
            this.manager = new Manager('#mainContents');
            
            this.searchPage = new SearchPage();
            
            this.manager.registerPages({
                'home': new HomePage(),
                'music': new MusicPage(),
                'search': this.searchPage,
                'resNotFound': new ResNotFoundPage()
            });
        },
        
        index: function () {
            this.hidePanel();
            this.manager.changePage('home');
        },
        
        create: function(){
            this.hidePanel();
            // TODO : refactor this
            
            // Creating an editView without parameters will create a new party
            this.manager.changePage(new EditView());
        },
        
        edit: function(id){
            this.hidePanel();
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
        
        party: function(){
            app.partyPanel.expand();
        },
        
        music: function(){
            this.hidePanel();
            this.manager.changePage('music');
        },
        
        search: function(query){
            this.hidePanel();
            this.searchPage.search(decodeURIComponent(query));
            this.manager.changePage('search');
        },
        
        // Hides the partyPanel
        hidePanel: function(){
            app.partyPanel.shrink();
        }
    });
});
