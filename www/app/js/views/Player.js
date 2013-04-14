
define(['PageFragment', 'backbone'], function(PageFragment){

    return PageFragment.extend({
        
        initialize: function(){
            this.template = _.template($('#playerTemplate').html());
            
            this.currentSong = this.model.get('songs')[0];
        },
        
        render: function(){
            this.$el.html(this.template({song: this.currentSong}));  
        }
    
    });
});