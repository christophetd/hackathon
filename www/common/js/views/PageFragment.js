/*
    This class helps improve performance by undelegating every event when the page is in background.
    It also sets the boolean "isActive" to false so that one can test within the class wether the page 
    is currently active.
*/
define(['jquery', 'backbone'], function($){
    var Fragment = function (options) {
        
        this.childFragments = new Array();
        
        if(options.parent && options.parent.childFragments){
            options.parent.childFragments.push(this);
        }

        this.isActive = true;
        
        Backbone.View.apply(this, [options]);
        
        // And to be sure the view stays up to date, we bind the activated event to the render method
        this.on('activated', this.render);
    };

    _.extend(Fragment.prototype, Backbone.View.prototype, {

        // put all of Panel's methods here. For example:
        activate: function(){
            if(this.isActive !== true){
                this.isActive = true;
                this.delegateEvents();
                
                for(var i in this.childFragments){
                    this.childFragments[i].activate();
                }
                
                this.trigger('activated');
            }
        },
        
        deactivate: function(){
            if(this.isActive !== false){
                this.isActive = false;
                this.undelegateEvents();
                
                for(var i in this.childFragments){
                    this.childFragments[i].deactivate();
                }
                
                this.trigger('deactivated');
            }
        },
        
        activeCb: function(cb){
            var self = this;
            
            return function(){
                if(self.isActive){
                    self[cb].apply(this, arguments);
                }
            };
        },
        
        makeActive: function(){
            var self = this;
            
            for(var i = 0 ; i < arguments.length ; i++){
                var fn = this[arguments[i]];
                
                this[arguments[i]] = function(){
                    if(self.isActive){
                        fn.apply(this, arguments);
                    }
                }
            }
        }
    });

    Fragment.extend = Backbone.View.extend;
    
    return Fragment;
});