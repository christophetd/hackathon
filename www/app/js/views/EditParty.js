/*
    EditParty.js 
    This view allows the user to edit a party's properties.
*/
define(['jquery', 'PageFragment', 'backbone'], function($, PageFragment){

    return PageFragment.extend({
    
        initialize: function(){
            this.template = _.template($('#partyEditTemplate').html());
        },
        
        render: function(){
            this.$el.html(this.template());
            return this;
        }
    });

});