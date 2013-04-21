/*
    Youtube player, interfacing youtube api with the internal player api.
    TODO : handle actions when youtube player is not ready yet.
*/

define(['PageFragment', 'backbone'], function(PageFragment){

    return PageFragment.extend({
    
        /*events: {
            'onStateChange #yt-player': 'onStateChange'
        },*/
        
        initialize: function(args){
            this.song = args.song;
            
            this.template = _.template($('#youtubePlayerTemplate').html()); // Change template
            
            this.handler = null;
            
            _.bindAll(this, 'onStateChange', 'onPlayerReady');
            
            
            // Youtube uses global events listeners, we create an object to capture them
            window.YTEvtProxy = {
                onStateChange: this.onStateChange
            
            };
            window.onYouTubePlayerReady = this.onPlayerReady;
            
            this.render();
        },
        
        render: function(){
           
            this.$el.html(this.template({songid: this.song.get('data')}));
        },
        
        
        /* Internal api : */
        
        play: function(){
            if(this.handler)
                this.handler.playVideo();
        },
        
        pause: function(){
            if(this.handler)
                this.handler.pauseVideo();
        },
        
        getTime: function(){
            if(this.handler)
                return this.handler.getCurrentTime();
                
            return 0;
        },
        
        getTotalTime: function(){
            if(this.handler)
                return this.handler.getDuration();
            
            return 0;
        },
        
        seekTo: function(pos){
            if(this.handler)
                this.handler.seekTo(pos, true);
        },
        
        /* ---- */
        
        /* Youtube api : */
        
        onStateChange: function(state){
            console.log("state changed : "+state);
            if(state == 1){          // Playing
                this.trigger('play');
            } 
            else if (state == 2){    // Paused
                this.trigger('pause');
            }
        },
        
        onPlayerReady: function(){
            this.handler = document.getElementById('yt-player');
                
            this.handler.addEventListener('onStateChange', 'YTEvtProxy.onStateChange');
            
            this.trigger('play');   // (when autoplay, YT api does not call onStateChange with state = 1)
        }
        
        /* ---- */
    
    });
});