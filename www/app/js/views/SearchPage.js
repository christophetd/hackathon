/*
    This page is where the user will find music to add to his party
    
    TODO : create a model representing a search query and it's response. The model will
    handle the task of querying additionnal results if we want more (ie. scrolling down the page
    should display results until no more result can be found on any source...)
 */
define(['jquery', 'PageFragment', 'common/js/util/Search.js', 'app/js/util/FakeSource.js', 'backbone'], function($, PageFragment, SearchAggregator, FakeSource){
    return PageFragment.extend({
        
        $scrollingElement: $('#mainContainer'), 
        dataLoading: false,
        keywords: '', 
        CHUNK_SIZE: 20,

        initialize: function () {
            this.template = _.template($('#searchTemplate').html());
            
            _.bindAll(this, 'detectPageBottom', 'bottomReached', 'loadResult');
            this.searchAggregator = new SearchAggregator({
                    chunkSize: this.CHUNK_SIZE, 
                    preloadThreshold: 5
            });

            this.searchAggregator.addSrc(FakeSource);
            this.query = this.searchAggregator.query(this.keywords);
            this.query.exec();
            

            /* Load initial results */
            var self = this;
            SearchAggregator.util.fetchResults(this.query, this.CHUNK_SIZE, {
                read: function(data) {
                    self.loadResult(data);
                }
            });
            
            this.detectPageBottom();
        },

        loadResult: function(result) {
            this.$el.find('#results').html("kikoo");
        },

        detectPageBottom: function() {
            this.$scrollingElement.bind('scroll', $.proxy(function() {
                if(this.$scrollingElement.scrollTop() + this.$scrollingElement.height() >= $("#mainContents").height() && this.dataLoading === false) {
                    this.bottomReached();
                }
            }, this));
        },

        bottomReached: function() {

        }, 

        search: function(query) {
            this.keywords = query;
        }, 

        render: function () {
            this.$el.html(this.template({query: this.keywords}));
            return this;
        }
    });
});