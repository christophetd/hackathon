/*
    This page is where the user will find music to add to his party
 */
define(['jquery', 'PageFragment', 'backbone'], function($, PageFragment){
    return PageFragment.extend({
        
        // the constructor
        initialize: function () {
            this.template = _.template($('#musicTemplate').html());
        },

        // populates the html to the dom
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
});