/* Mobile
 * main.js is the only file explicitly loaded by require (see index.html)
 * It will load every main classes needed by app to initialize.
 * One doesn't need to specify here sub-dependencies.
*/

requirejs.config({
    paths: {
        'underscore': '/common/js/lib/underscore',
        'backbone': '/common/js/lib/backbone',
        'jqm': 'lib/jquery.mobile-1.3.0.min',
        'common': '/common/js',
        'PageFragment': '/common/js/util/PageFragment'
    }
});


require(["jquery"], function($) {
        
        /* Piece of code copied from jqm-config. I don't know what it does but it looks like application logic
            which should go inside a view's code...
        */
        //Searchrequest if Enter is hit in filter form
        $(document).delegate('[data-role="page"]', 'pageinit', function () {
            var _this = this
            $(_this).delegate('input[data-type="search"]', 'keydown', function (event) {
                //detect if enter was hit (13)
                if (event.which == 13) {
                    event.preventDefault();
                    var toAdd = $('input[data-type="search"]').val();
                    //just to show that the value is saved in toAdd
                    alert(toAdd);
                    $.mobile.changePage( $("#search"), "slide", true, true);

                    //Make a searchrequest
                };
            });
        });
        
        
        /***    Actual implementation of main.js     ***/
        
        // We listen to mobileinit event before loading jquery mobile so that we are ready when this event will be fired.
        $( document ).on( "mobileinit",
            // Set up the "mobileinit" handler before requiring jQuery Mobile's module
            function() {
                // Prevents all anchor click handling including the addition of active button state and alternate link bluring.
                $.mobile.linkBindingEnabled = false;

                // Disabling this will prevent jQuery Mobile from handling hash changes
                $.mobile.hashListeningEnabled = false;
                
               
            }
        );
        
        
        /* We only want to require jqm now that we are listening to mobileinit.
            Since app may have sub-dependencies requireing jqm, we also only requrie it now.
        */
        require(['app', 'jqm'], function(app){
            //Initializing app
            app.init();
        });
});