/*
    This view is displayed when a user first arrives to the website.
 */
define(['jquery', 'PageFragment'], function($, PageFragment){
    return PageFragment.extend({
        
        /*
            The current implementation of home is for demonstartion purpose only. Remove the dummy implementation
            asap. (see Share.js and Search.js to see what the cleaned file should look like)
            
            The page contains a view which shows an attribute of a 'counter model'. The model is just incrementing
            a value every second, thus triggering a 'change' event. The view updates itself on every counter change event
            but we don't want it to update when it is hidden. This is where PageFragment gets useful...
            
        */
        initialize: function () {
            
            /* Creating the model we want to pass to our child view.
                Note that a model should always be defined in a separate file and not inline as follows !
             */
            var counterModel = new (Backbone.Model.extend({
                defaults: {
                    'counter': 0
                },
                
                initialize: function(){
                    
                    // This just updates the model each seconds
                    (function(){
                        var i = 0;
                        window.setInterval($.proxy(function(){
                            this.set({counter: i++});
                        }, this), 1000);
                    }).call(this);
                }
            }));
            
            
            /* We now want to create a child view that will render some part of our page.
                Here we extend the pageFragment inline because we don't want to create many files for
                a little demo like this but you should do it in a separate file and require it as usual.
                
                This child view updates the contents of a div to show the actual value of the counter model.
             */
            new (PageFragment.extend({
            
                    initialize: function(){
                        
                        // Ensures the function render will only be called when the fragment is active.
                        this.makeActive('render');
                        
                        // Ensures the function render will always be called with the context 'this'
                        _.bindAll(this, 'render');
                       
                        // We then bind our render method to the model's change event
                        this.model.on('change', this.render);
                    },
                    
                    // Dummy test function for the child view
                    render: function(){
                    
                        console.log('rendering fragment (counter : '+this.model.get('counter')+' )');
                        this.$el.html(this.model.get('counter'));
                    }
                })
                
            /* Among with the usual parameters, we pass the "parent" attribute which is used to deactivate the child view
                when the parent view is deactivated. This way, we can create a whole hierarchy of views which will only be active
                when they are on the foreground, saving lots of ressources.
            */
            )({
                parent: this, 
                el: '#counter',
                model: counterModel
            });
        }
    });
});

