/*
    ResNotFound.js
    Displays a resource not foud error.
*/
define(['jquery', 'PageFragment', 'backbone'], function($, PageFragment){

    return PageFragment.extend({
    
        initialize: function(){
            this.template = $('#resNotFoundTemplate').html();
        },
        
        render: function(){
            this.$el.html(this.template);
            return this;
        }
    });

});