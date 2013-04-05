/*
    This view is displayed when a user first arrives to the website.
 */
define(['jquery', 'backbone'], function($){
    return Backbone.View.extend({

        initialize: function () {
            this.template = $('#home').html();
        },
    

        render: function () {
            this.$el.html(this.template);
            return this;
        }
    });
});

