/*
    This is the main player (on the party panel). It delegates playback implementation to specific player (ie. YoutubePlayer)
    It proxies events and controls so that the shrinked player can access player functionnalities with a single fixed interface).

*/
define(['app', 'PageFragment', 'views/YoutubePlayer', 'backbone'], function(app, PageFragment, YoutubePlayer){

    return PageFragment.extend({
        
        initialize: function(){
            if(!app) app = require('app');
            this.template = _.template($('#playerTemplate').html());
            
            this.listenTo(app.getParty(), 'change:currentSong', this.render);
            
        },
        
        render: function(){
            var song = app.getParty().get('currentSong');
            
            var player = null;
            
            if(song.get('src') == 'youtube')
                player = this.player = new YoutubePlayer({song: song});
                
            this.$el.html(this.template({
                song: song.toJSON(),
                player: (player) ? player.$el.html() : null
            }));
            
            // Proxies events
            player.on("all", $.proxy(function(eventName) {
                this.trigger(eventName);
            }, this));
        },
        
        /* Proxied methods : */
        
        play: function(){
            this.player.play();
        },
        
        pause: function(){
            this.player.pause();
        },
        
        getTime: function(){
            return this.player.getTime();
        },
        
        getTotalTime: function(){
            return this.player.getTotalTime();
        },
        
        seekTo: function(pos){
            this.player.seekTo(pos);
        }
    
    });
});