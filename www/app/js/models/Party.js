/*
    Party model
*/

define(['common/models/Playlist', 'backbone'], function(Playlist){
    
    return Backbone.Model.extend({
        
        url: "api/party/",
        
        defaults: {
            name: 'new party',
            description: 'an awesome party'
        },
        
        initialize: function(){
            
            
            this.playlist = new Playlist();
            
        }
    });
});