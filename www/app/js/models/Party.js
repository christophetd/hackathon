/*
    Party model
*/

define(['common/models/Playlist', 'backbone'], function(Playlist){
    
    return Backbone.Model.extend({
        
        defaults: {
            name: 'new party',
            alias: 'myParty',      // Used in the access url
            description: 'an awesome party',
            playlist: new Playlist()
        },
        
        initialize: function(){
            
            this.set('currentSong', this.get('playlist').songs.at(0));
            
        }
    });
});