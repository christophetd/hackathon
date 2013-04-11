/*
    This view is displayed when a user first arrives to the website.
 */
define(['jquery', 'PageFragment', 'backbone'], function($, PageFragment){
    return PageFragment.extend({
    
        // the constructor
        initialize: function () {
            this.template = $('#homeTemplate').html();
        },

        // populates the html to the dom
        render: function () {
            this.$el.html(this.template);
            return this;
        }
    });
});