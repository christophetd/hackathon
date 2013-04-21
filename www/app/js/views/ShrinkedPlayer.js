
define(['app', 'jquery', 'lib/simple-slider', 'backbone'], function(app){

    /* Intervals between tracking refresh */
    var REFRESH_RATE_MS = 200;
    
    return Backbone.View.extend({
        
        events: {
            "mousedown #s_playButton"       : "play",
            "mousedown #s_pauseButton"      : "pause",
            "slider:changed .s_trackSlider"   : "onSliderChange"
        },
        
        initialize: function(){
            if(!app) app = require('app');
            this.template = _.template($('#shrinkedPlayerTemplate').html());
            
            _.bindAll(this, 'pause', 'play', 'showPlayButton', 'showPauseButton', 'pollTime', 'onSliderChange');
            
            app.player.on('play', this.showPauseButton);
            app.player.on('pause', this.showPlayButton);
            
            this.listenTo(app.getParty(), 'change:currentSong', this.render);
            
            this.interval = window.setInterval(this.pollTime, REFRESH_RATE_MS);
        },
        
        render: function(){
            this.$el.html(this.template({
                song: app.getParty().get('currentSong').toJSON() 
            }));
            
            this.slider = this.$('.s_trackSlider').simpleSlider({
                highlight: true,
                animate: false
            });
            this.playButton = this.$('#s_playButton');
            this.pauseButton = this.$('#s_pauseButton');
            
            return this;
        },
        
        pause: function(evt){
            if(evt){evt.preventDefault(); evt.stopPropagation();}
            
            app.player.pause();
        },
        
        play: function(evt){
            if(evt){evt.preventDefault(); evt.stopPropagation();}
            
            app.player.play();
        },
        
        showPlayButton: function(state){
            this.pauseButton.hide();
            this.playButton.show();
        },
        
        showPauseButton: function(){
            this.pauseButton.show();
            this.playButton.hide();
        },
        
        pollTime: function(){
            var time = app.player.getTime();
            var totalTime = app.player.getTotalTime();
            
            this.slider.simpleSlider("setRatio", time/totalTime);
        },
        
        onSliderChange: function(evt, data){
            if(data.trigger == "domDrag"){
                console.log("change : "+data.ratio);
                app.player.seekTo(app.player.getTotalTime()*data.ratio);
            }
        },
        
        destroy: function(){
            window.clearInterval(this.interval);
        }
    
    });
});