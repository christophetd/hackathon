/*
   Playlist.js : an ordered list of songs to be played

*/
define(['backbone'], function(){

    return Backbone.Model.extend({
        
        defaults: {
            // For testing purpose, we fill the songs array
            songs: [{title: "never gonna give you up"}, {title: "Harlem style (10 hours edition)"}]
        },
        
        initialize: function(){
        }
    });
});