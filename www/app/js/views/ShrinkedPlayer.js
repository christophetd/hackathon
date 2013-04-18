
define(['app', 'jquery', 'lib/simple-slider', 'backbone'], function(app){

    return Backbone.View.extend({
        
        events: {
            "mousedown #s_playButton": "play",
            "mousedown #s_pauseButton": "pause"
        },
        
        initialize: function(){
            if(!app) app = require('app');
            this.template = _.template($('#shrinkedPlayerTemplate').html());
            
            _.bindAll(this, 'pause', 'play', 'setPlayButton');
            
            this.listenTo(app.getParty(), 'change:currentSong', this.render);
        },
        
        render: function(){
            this.$el.html(this.template({
                song: app.getParty().get('currentSong').toJSON() 
            }));
            
            this.$('.s_trackSlider').simpleSlider({
                highlight: true,
                animate: false
            });
            this.playButton = this.$('#s_playButton');
            this.pauseButton = this.$('#s_pauseButton');
            return this;
        },
        
        pause: function(evt){
            if(evt){evt.preventDefault(); evt.stopPropagation();}
            this.setPlayButton(true);
        },
        
        play: function(evt){
            if(evt){evt.preventDefault(); evt.stopPropagation();}
            this.setPlayButton(false);
        },
        
        setPlayButton: function(state){
            if(state === true){
                this.pauseButton.hide();
                this.playButton.show();
            } else {
                this.pauseButton.show();
                this.playButton.hide();
            }
        }
    
    });
});