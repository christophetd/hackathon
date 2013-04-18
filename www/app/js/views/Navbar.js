/*
    Navbar.js (view)
    Handles the navbar's behaviour.
*/

define(
    ['jquery', 'backbone'], 
    function($){
    
    // Mapping between routes an links used to update link's active states
    var mapRoute = function(r){
        switch(r){
            case "music":
            case "search":
                return "music";
            case "party": "party"
                return "party";
            default:
                return "none";
        }
    };

    return Backbone.View.extend({
        
        events:{
            "submit #navbarSearch": "onSearch"
        },
        
        initialize: function(){
            
            _.bindAll(this, 'onRoute', 'onSearch');
            
            Backbone.history.on('route', this.onRoute);
            
            this.searchInput = this.$el.find('#navbarSearch input');
        },
        
        onRoute: function(router, route){
            this.$el.find('.nav-link').removeClass('active')
                .filter('[data-page='+mapRoute(route)+']').addClass('active');
        },
        
        onSearch: function(evt){
            evt.preventDefault();
            if(this.searchInput.val() !== '')
                window.location.hash = 'search/'+encodeURIComponent(this.searchInput.val());
        }
        
    });
});