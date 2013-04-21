/*
   Playlist.js : an ordered list of songs to be played

*/
define(['common/models/Song', 'backbone'], function(Song){

    // Internal collection :
    
    var SongCollection = Backbone.Collection.extend({
        model: Song,
        
        initialize: function(){
            this.add(new Song({title: "G3 live fron Denver Joe Satriani, Steve Vai, Yngwe Malmsteen", src: "youtube", data: "eS3cneScoaw"}));
            this.add(new Song({title: "Muse - Time is running out", src: "youtube", data: "oHg5SJYRHA0"}));
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