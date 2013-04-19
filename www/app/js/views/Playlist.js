
define(['PageFragment', 'app', 'backbone'], function(PageFragment, app){

    var SongVignette = PageFragment.extend({
        
        events: {
            'click [data-action=playNow]': 'onPlayClick',
            'click [data-action=delete]': 'onDeleteClick',
            'mouseenter': 'onMouseIn',
            'mouseleave': 'onMouseOut'
        },
        
        initialize: function(){
            _.bindAll(this, 'onPlayClick', 'onDeleteClick', 'onMouseIn', 'onMouseOut');
            
            this.template = _.template($('#playlistSongTemplate').html());
            
            this.render();
        },
        
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            
            this.trashButton = this.$('[data-action=delete]').hide();
        },
        
        onPlayClick: function(evt){
            evt.preventDefault();
            
            app.getParty().set('currentSong', this.model);
        },
        
        onDeleteClick: function(evt){
            evt.preventDefault();
            
            app.getParty().get('playlist').songs.remove(this.model);$
        },
        
        onMouseIn: function(evt){
            this.trashButton.show();
        },
        
        onMouseOut: function(evt){
            this.trashButton.hide();
        }
    
    });
    
    return PageFragment.extend({
        
        initialize: function(){
            if(!app) app = require('app');
            
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
                var s = this.songs[model.cid] = new SongVignette({model: model});
                
                this.songContainer.append(s.$el);
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