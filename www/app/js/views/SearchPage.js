/*
    This page is where the user will find music to add to his party
    
    TODO : create a model representing a search query and it's response. The model will
    handle the task of querying additionnal results if we want more (ie. scrolling down the page
    should display results until no more result can be found on any source...)
 */
define(['jquery', 'PageFragment', 'backbone'], function($, PageFragment){
    return PageFragment.extend({
        
        // the constructor
        initialize: function () {
            this.template = _.template($('#searchTemplate').html());
            
            this.query = '';
        },
        
        // Proceeds a search
        search: function(query){
            this.query = query;
            this.render();
        },

        // populates the html to the dom
        render: function () {
            this.$el.html(this.template({query: this.query}));
            return this;
        }
    });
});