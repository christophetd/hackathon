/*
    PartyPanel.js (view)
    This view allows the user to have access to it's party at all time. 
    When shrinked, it displays a small player and some button to expand it in the bottom of the page.
    When expanded, it takes the whole page to display the playlist, the actual player and some functions
    to administrate the party.
    
    Note that the shrinked player is an abstracted player which methods are proxied to the actual player,
    hidden somewhere (but still in the DOM or the music stops !).
    
    The panel can be expanded or shrinked with the methods expand() and shrink().
*/

define(
    ['jquery', 'app', 'views/DjView', 'views/ShrinkedPlayer', 'backbone'], 
    function($, app, DjView, ShrinkedPlayer){

    var Panel = Backbone.View.extend({
        
        events: {
            'click [data-action=expand]': 'onExpandClick',
            'click [data-action=shrink]': 'onShrinkClick'
        },
        
        initialize: function(){
            if(!app) app = require('app');
            
            _.bindAll(this, 'shrink', 'expand');
            
            app.on('partyChange', $.proxy(changeParty, this));
            changeParty.call(this, app.getParty());
            
            this.shrinked = true;
            
            //Retreives shrinked contents
            this.shrinkedContents = this.$('#panelShrinkedContents');
            
            /* Here is a tricky hack : we measure the height of the panel as the main content is hidden,
                then we definitively show this content and we reset the height of the panel as it was before
                to make it look like the panel is hidden (but the contents is still active...) */
            this.measure = this.$el.height();
            this.expandedContents = this.$('#panelExpandedContents').show();
            this.$el.height(this.measure);
            
        },
        
        onExpandClick: function(evt){
            evt.stopPropagation();
            evt.preventDefault();
            
            window.location.hash = '#/party';
        },
        
        onShrinkClick: function(evt){
            evt.stopPropagation();
            evt.preventDefault();
            
            window.history.back();
        },
        
        expand: function(){
            if(!this.animating && this.shrinked){ // Animate now
                this.animating = true;
                doExpand.call(this);
            } else if(this.animating && this.shrinked && !this.animBack){ // Animate later
                this.animBack = 'expand';
            } else if(this.animating && !this.shrinked && this.animBack){ // Cancel animBack
                this.animBack = false;
            }
        },
        
        shrink: function(){
            if(!this.animating && !this.shrinked){ // Animate now
                this.animating = true;
                doShrink.call(this);
            } else if(this.animating && !this.shrinked && !this.animBack){ // Animate later
                this.animBack = 'shrink';
            } else if(this.animating && this.shrinked && this.animBack){ // Cancel animBack
                this.animBack = false;
            }
        }
    
    });
    
    /* Private methods : */
    
    // Called when the app's party is changed, (with the view's context).
    function changeParty(party){
        this.party = party;
        
        this.djView = new DjView({
            el: '#panelPage',
            model: app.getParty()
        }).activate();
        
        // Player view has to be explicitely destroyed for garbadge collection to happen
        if(this.playerView) this.playerView.destroy();
        
        // We MUST create the player view after dj view because the latter one depends on the other.
        this.playerView = new ShrinkedPlayer({
            el: '#shrinkedPlayer',
            model: app.getParty()
        }).render();
    }
    
    function onAnimationEnd(){
        if(this.animBack === 'expand'){
            this.animBack = false;
            doExpand.call(this);
        } else if(this.animBack === 'shrink'){
            this.animBack = false;
            doShrink.call(this);
        } else {
            this.animating = false;
            
            // We can now display the final state (shrinked or expanded)
            if(this.shrinked){
                this.shrinkedContents.fadeIn();
            }
        }
    }
    
    function doExpand(){
        this.shrinked = false;
        
        this.$el.css('top', this.$el.offset().top)
                .css('height', '');
        this.$el.removeClass('panelShrinked');
        
        this.shrinkedContents.fadeOut('fast');
        this.$el.animate({
            top: app.navbar.$el.height()
        }, {
            duration: 'slow',
            complete: $.proxy(onAnimationEnd, this)
        });
    }
    
    function doShrink(){
        this.shrinked = true;
        
        this.$el.css('height', this.$el.height())
                .css('top', '');
        
        this.$el.animate({
            height: this.measure
        }, {
            duration: 'slow',
            complete: $.proxy(onAnimationEnd, this)
        });
    }
    
    return Panel;
});