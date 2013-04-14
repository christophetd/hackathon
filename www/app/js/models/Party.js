/*
    Party model
*/

define(['common/models/Playlist', 'backbone'], function(Playlist){
    
    return Backbone.Model.extend({
        
        defaults: {
            name: 'new party',
            description: 'an awesome party'
        },
        
        initialize: function(){
            this.set('playlist', new Playlist());
        }
    });
});