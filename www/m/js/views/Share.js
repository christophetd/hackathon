/*
    Shareview
 */
define(['jquery', 'backbone'], function($){
    return Backbone.View.extend({
    
        initialize: function () {
            this.template = $('#share').html();
        },
    

        render: function () {
            this.$el.html(this.template);
            return this;
        }
    });
});

