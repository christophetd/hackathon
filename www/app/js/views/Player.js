
define(['app', 'PageFragment', 'backbone'], function(app, PageFragment){

    return PageFragment.extend({
        
        initialize: function(){
            if(!app) app = require('app');
            this.template = _.template($('#playerTemplate').html());
            
            this.listenTo(app.getParty(), 'change:currentSong', this.render);
        },
        
        render: function(){
            this.$el.html(this.template({
                song: app.getParty().get('currentSong').toJSON()
            }));  
        }
    
    });
});