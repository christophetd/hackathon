
define(['PageFragment', 'backbone'], function(PageFragment){

    return PageFragment.extend({
        
        initialize: function(){
            this.template = _.template($('#playlistTemplate').html());
        },
        
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));  
        }
    });
});