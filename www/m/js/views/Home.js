/*
    This view is displayed when a user first arrives to the website.
 */
define(['jquery', 'views/PageFragment'], function($, PageFragment){
    return PageFragment.extend({
        
        
        /*
            The current implementation of home is for demonstartion purpose only. Remove the dummy implementation
            asap. (see Share.js and Search.js to see what the cleaned file should look like)
            
            An event listener is attached to the window's onclick event. It triggers the custom 'winclick' event
            which is delegated to the test function. We can see in the debugging console that the test function
            is actually called only when the "home" page is active.
            Also, a child view is declared and acts the same way as the parent. It is automatically deactivated when
            the parent is.
        */ 
        
        //Here we delegate our custom event to the test method
        events: {
            'winclick': 'test'
        },
        
        initialize: function () {
            
            /* This crappy piece of code captures window's click events so that they trigger our winclick event inside the view.
                It highlights how the PageFragment works, however views should never listen to events outside their base element ($el).
             */
            $(window).click($.proxy(function(){
                
                /* This line is interesting as it shows how to use an internal event to usie the delegating system instead
                of explicitely calling the callback */
                this.$el.trigger('winclick');
                
            }, this));
            
            /* We now want to create a child view that will probably render in some part of our page.
                Here we extend the pageFragment inline because we don't want to create many files for
                a little demo like this one but you should do it in a separate file and require it as usual.
                
                This child views act as stupidly as it's parent : it triggers it's test function when a window's click event is fired.
             */
            new (PageFragment.extend({
            
                    // This is exactly the same as above
                    events: {
                        'winclick': 'test'
                    },
                    initialize: function(){
                        $(window).click($.proxy(function(){
                            this.$el.trigger('winclick');
                        }, this));
                    },
                    
                    //Dummy test function for the child view
                    test: function(){
                        console.log('Child test function called (isActive = '+this.isActive+')');
                    }
                })
                
            /* Among with the usual parameters (ie. el), we pass the "parent" attribute which is used to deactivate the child view
                when the parent view is deactivated. This way, we can create a whole hierarchy of views which will only be active
                when they are on the foreground, saving lots of ressources.
            */
            )({parent: this});
        },
        
        //Dummy test function for the parent view
        test: function(){
            console.log('Parent test function called (isActive = '+this.isActive+')');
        },

        render: function () {
            return this;
        }
    });
});

