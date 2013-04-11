/* Mobile
 * This is the only app router. It handles navigation and shows the proper views.
 */
define([
    'views/PageManager',
    'views/Home',
    'views/Search',
    'views/Share',
    'backbone',
], function(
    PageManager,
    HomeView,
    SearchView,
    ShareView
){
    return Backbone.Router.extend({

        //Defines mapping between routes and methods
        routes: {
            "home":"home",
            "share":"share",
            "search":"search"
        },

        //Called when the router is instanciated. 
        initialize: function () {
            
            /*
                If a view requires app, we will get circular dependency 
                ( app -> Router -> HomeView -> ... -> app -> Router -> etc).
                Therefore, our views might be null at that point and we need to require them again now that
                dependencies have been solved.
             */
            if(!HomeView) HomeView = require('views/Home');
            if(!SearchView) SearchView = require('views/Search');
            if(!ShareView) ShareView = require('views/Share');
            
            /* Since this is a mobile platform, we can't afford to create new views everytime the user 
                swiches tabs. We have to instanciate our views once and for all and store them somewhere
                (the PageManager seems appropriate for that)
            */
            this.manager = new PageManager('#maincontent');
            this.manager.registerPages({
                'home': new HomeView({el: '#home'}),
                'share': new ShareView({el: '#share'}),
                'search': new SearchView({el: '#search'})
            });
        
            // Handle back button throughout the application
            $('.back').live('click', function(event) {
                window.history.back();
                return false;
            });
        },
        
        home: function () {
            console.log('#home');
            this.manager.changePage('home');
        },

        share: function () {
            console.log('#share');
            this.manager.changePage('share');
        },

        search: function () {
            console.log('#search');
            this.manager.changePage('search');
        }

        
    });
});

