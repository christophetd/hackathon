
define(['PageFragment', 'backbone'], function(PageFragment){

    return PageFragment.extend({
        events:{
            'click .openLibrary': 'openLibrary'
        },
        
        initialize: function(){
            this.template = _.template($('#playlistTemplate').html());
        },
        
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));  
        },
        
        openLibrary: function(evt){
            evt.preventDefault();
            evt.stopPropagation();
            
            // TODO
            
        }
    });
});