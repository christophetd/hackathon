/* Mobile
 * This is the only app router. It handles navigation and shows the proper views.
 */
define([
    'app',
    'views/Home',
    'views/Search',
    'views/Share',
    'backbone',
    'jqm'
], function(
    app,
    PagesView
){
    return Backbone.Router.extend({

        //Defines mapping between routes and methods
        routes: {
            "":"home",
            "share":"share",
            "search":"search"
        },

        //Called when the router is instanciated. 
        initialize: function () {
            if(!app) app = require('app');
            // Handle back button throughout the application
            $('.back').live('click', function(event) {
                window.history.back();
                return false;
            });
            this.firstPage = true;
        },
        
        home:function () {
        console.log('#home');
        console.log(new require('views/Home'));
        var h = new (require('views/Home'))({el: '.maincontent'});
        this.changePage(h);
        },

        share:function () {
            console.log('#share');
            var s = new (require('views/Share'))({el: '.maincontent'});
            this.changePage(s);
        },

        search:function () {
            console.log('#search');
            var s = new (require('views/Search'))({el: '.maincontent'});
            this.changePage(s);
        },

        changePage:function (page) {
            //$(page.el).attr('data-role', 'page');
            page.render();
            //$('body').append($(page.el));
            //var transition = $.mobile.defaultPageTransition;
            // We don't want to slide the first page
            /*if (this.firstPage) {
                transition = 'none';
                this.firstPage = false;
            }
            $.mobile.changePage($(page.el), {changeHash:false, transition: transition}); */
            //$('body').trigger("create");
            $.mobile.pageContainer.trigger( "create" );
            
        }

        
    });
});

