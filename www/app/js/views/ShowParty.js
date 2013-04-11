/*
    ShowParty.js 
    This is the root view for the interesting part : where the dj can throw a party !
*/
define(['jquery', 'PageFragment', 'backbone'], function($, PageFragment){

    return PageFragment.extend({
    
        initialize: function(){
            this.template = _.template($('#djTemplate').html());
        },
        
        render: function(){
            this.$el.html(this.template());
            return this;
        }
    });

});