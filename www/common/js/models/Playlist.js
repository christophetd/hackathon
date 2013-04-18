/*
   Playlist.js : an ordered list of songs to be played

*/
define(['common/models/Song', 'backbone'], function(Song){

    // Internal collection :
    
    var SongCollection = Backbone.Collection.extend({
        model: Song,
        
        initialize: function(){
            this.add(new Song({title: "never gonna give you up", source: "init"}));
            this.add(new Song({title: "Harlem style (10 hours edition)", source: "init"}));
        }
    });
    
    return Backbone.Model.extend({
        
        initialize: function(){
            // Songs is not an attribute and is private
            this.set('songs', new SongCollection());
            
            // Shorthand
            this.songs = this.get('songs');
        }
    });
});