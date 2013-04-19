/*
    This page is where the user will find music to add to his party
    
    TODO : create a model representing a search query and it's response. The model will
    handle the task of querying additionnal results if we want more (ie. scrolling down the page
    should display results until no more result can be found on any source...)
 */
 
define(['jquery', 'PageFragment', 'common/js/util/Search.js', 'common/js/util/YoutubeSource.js', 'common/js/util/FakeSource.js',
    'common/models/Song', 'backbone'], function($, PageFragment, SearchAggregator, YoutubeSource, FakeSrc, Song){

    var SearchResultView = PageFragment.extend({
        initialize: function() {
            this.template = _.template($('#searchResultTemplate').html());
        }, 
        render: function() {
            this.$el.html(this.template({result: this.model}));
        }
    });
    return PageFragment.extend({
        
        $scrollingElement: $('#mainContainer'), 
        dataLoading: false,
        keywords: '', 
        CHUNK_SIZE: 20,
        sources: [], 

        initialize: function () {
            this.template = _.template($('#searchTemplate').html());
            _.bindAll(this, 'detectPageBottom', 'bottomReached', 'loadResult', 'addSrc', 'removeSrc', 'disableSrc');

            this.searchAggregator = new SearchAggregator({
                    chunkSize: this.CHUNK_SIZE, 
                    preloadThreshold: 3
            });

            this.searchAggregator.addSrc(YoutubeSource);
            
            this.addSrc(YoutubeSource);
            this.addSrc(FakeSrc);
            

            this.detectPageBottom();
        },

        loadResult: function(result) {
            if(this.loader) this.loader.hide();
            
            var $result = new SearchResultView({
                model: result, 
            });
            $result.render();
            this.$el.find('#results').append($result.$el);
            
            this.dataLoading = false;
        },

        detectPageBottom: function() {
            this.$scrollingElement.bind('scroll', $.proxy(function() {
                if(this.$scrollingElement.scrollTop() + this.$scrollingElement.height() >= $("#mainContents").height() 
                        && this.dataLoading === false) {
                    this.bottomReached();
                }
            }, this));
        },

        bottomReached: function() {
            this.dataLoading = true;
            this.loader.show();

            var self = this;
            SearchAggregator.util.fetchResults(this.queryIterator, 2, {
                read: this.loadResult
            });
        },  

        search: function(keywords) {
            this.keywords = keywords;
            this.queryIterator = this.searchAggregator.query(this.keywords);

            this.queryIterator.on('end', $.proxy(function() {
                this.loader.hide();
                this.$el.find('#results').append('No results were found.');
            }, this));
            this.queryIterator.on('error', function(err) {
                console.log("An error as occured while searching - "+err);
            })
            this.queryIterator.exec();
        }, 

        render: function () {
            var self = this;

            this.$el.html(this.template({
                keywords: this.keywords, 
                sources: this.sources
            }));
            
            /* Load initial results */
            SearchAggregator.util.fetchResults(this.queryIterator, this.CHUNK_SIZE, {
                read: self.loadResult
            });

            /* Loader (it will be hidden by loadResult) */
            this.loader = $('<img />')
                    .attr('src', '/app/img/ajax-loader.gif')
                    .attr('id', 'searchAjaxLoader')
                    .appendTo(this.$el);


            /* Dropdown sources menu  */
            this.$el.find('.selectSource').each(function() {
                var srcTitle = $(this).attr('data-id');
                var $stateElement = $(this).find('i:first');

                if(self.searchAggregator.hasSource(srcTitle)) {
                   $stateElement.attr('class', 'icon-ok');
                }

                $(this).click(function() {
                    if($stateElement.hasClass('icon-ok')) {
                        self.disableSrc(srcTitle);
                        $stateElement.removeClass('icon-ok');
                    }
                    else {
                        self.addSrc(srcTitle);
                        $stateElement.attr("class" , "icon-ok");   
                    }
                    self.search(self.keywords);
                    self.render();
                    return false;
                });
            });

            return this;
        }, 
        addSrc: function(source) {
            var source = source.title ? source : SearchAggregator.util.mapToSource(source);

            // If it is not just disabled, it's not in the sources array, we add it
            if(this.sources.indexOf(source) === -1) {
                this.sources.push(source); 
            }
            // And add the source to the search aggregator
            this.searchAggregator.addSrc(source);
        }, 
        removeSrc: function(source) {
            var index = this.sources.indexOf(source);
            if(index != -1) {
                this.sources.slice(index, 1);
            }
            this.searchAggregator.removeSrc(source);
        }, 

        /* Disables a source : keeps it in the local sources array (so it remains in the source select dropdown)
        * but removes it from the search aggregator so the result does not include the source anymore */
        disableSrc: function(source) {
            this.searchAggregator.removeSrc(source);
        }
    });
});