/*
    / ! \ This file has to be removed / ! \
    
    ShowParty.js 
    This is the root view for the interesting part : where the dj can throw a party !
*/
define(
    ['jquery', 'PageFragment', 'views/Playlist', 'views/Player', 'backbone'], 
    function($, PageFragment, PlaylistView, PlayerView){

    return PageFragment.extend({
        
        // This view assumes it was passed a valid party as it's model parameter
        initialize: function(){
            this.template = _.template($('#djTemplate').html());

        },
        
        render: function(){
            this.$el.html(this.template({party: this.model.toJSON()}));
            
            /* Since we replace the whole DOM, we must recreate the child view in here
                (ideally, this view should just render once)
            */
            this.playlist = new PlaylistView({
                parent: this, 
                el: this.$el.find('#playlist'),
                model: this.model.get('playlist')});

            app.player = this.player = new PlayerView({
                parent: this, 
                el: this.$el.find('#player'),
                model: this.model.get('playlist')});
                
            this.player.render();
            this.playlist.render();
            
            this.$('[data-toggle=tooltip]').tooltip({placement: 'bottom'});
            return this;
        }
    });

});