/* 
 * app.js is the main application object. It instanciates the main views and router(s).
 * Whenever something is global to the application, it has to be placed here.
 * Since there is only one party going on at a time, the application holds the party model and the player view.
 *
 * The player is accessible via app.player, the party can be accessed with getParty() and setParty().
 * When the party is replaced, the 'partyChange' event is fired.
 *
 * The app also initializes the navbar view (app.nabar).
 */


define([
    'models/Party',
    'util/PageManager',
    'backbone', 
    'Router', 
    'views/PartyPanel',
    'views/Navbar'],
    function(Party, PageManager){

    // App is a singleton object
    var App = {};
    
    _.extend(App, Backbone.Events);
    
    /* 
        There is always a party going on. The app object encapsulates it. 
        When this party is replaced, the partyChange event is fired.
    */
    var party = new Party();
    
    /*
        Only way to access the active party from outside the app module.
    */
    App.getParty = function(){
        return party;
    }
    
    /*
        Sets the active party and triggers the event partyChange
    */
    App.setParty = function(p){
        if(!party instanceof Party)
            throw "party must be of type Party !";
        party = p;
        this.trigger('partyChange', party);
    }
    
    /*
        This method is called by the loader when the dom is ready.
    */
    App.init = function () {
        // Creates the router
        this.router = new (require('Router'));
        
        /* 
            The panel is directly attached to the app object since it is a persistent element of the UI.
            It is present on every page and can be expanded to it's own page.
        */
        this.partyPanel = new (require('views/PartyPanel'))({
            el: '#partyPanel',
            model: party
        });
        
        /*
            Handles everything happening in the navbar (most likely search, login, dropdowns...)
         */
        this.navbar = new (require('views/Navbar'))({
            el: '#navbar'
        });
        
        
        
        if(!Backbone.history.start()){
            window.location.hash = '/';
        }
    };
    
    
    return window.app = App;
});