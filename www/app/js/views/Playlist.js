
define(['PageFragment', 'backbone'], function(PageFragment){

    return PageFragment.extend({
        
        initialize: function(){
            this.template = _.template($('#playlistTemplate').html());
            this.songTemplate = _.template($('#playlistSongTemplate').html());
            
            this.listenTo(this.model.songs, "add", this.addSong);
            this.listenTo(this.model.songs, "remove", this.removeSong);
            
            this.songs = {};
        },
        
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            
            this.songContainer = this.$('.songContainer');
            
            this.addAll(this.model.songs);
        },
        
        addAll: function(songs){
            console.log(songs);
            songs.each(this.addSong, this);
        },
        
        addSong: function(model){
            if(!(model.cid in this.songs)){
                var s = this.songs[model.cid] = $(this.songTemplate(model.toJSON()));
                s.find('.songLink').on('click', function(evt){
                    evt.preventDefault();
                    evt.stopPropagation();
                    
                    app.getParty().set('currentSong', model);
                });
                this.songContainer.append(s);
            }
        },
        
        removeSong: function(model){
            if(model.cid in this.songs){
                this.songs[model.cid].remove();
                delete this.songs[model.cid];
            }
        }
    });
});