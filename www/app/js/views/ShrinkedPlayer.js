
define(['jquery', 'lib/simple-slider', 'backbone'], function(){

    return Backbone.View.extend({
        
        events: {
            "mousedown #s_playButton": "play",
            "mousedown #s_pauseButton": "pause"
        },
        
        initialize: function(){
            this.template = _.template($('#shrinkedPlayerTemplate').html());
            
            _.bindAll(this, 'pause', 'play', 'setPlayButton');
        },
        
        render: function(){
            this.$el.html(this.template());
            
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