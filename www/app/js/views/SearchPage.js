/*
    This page is where the user will find music to add to his party
    
    TODO : create a model representing a search query and it's response. The model will
    handle the task of querying additionnal results if we want more (ie. scrolling down the page
    should display results until no more result can be found on any source...)
 */
define(['jquery', 'PageFragment', 'common/js/util/Search.js', 'common/js/util/YoutubeSource.js', 
    'common/models/Song', 'backbone'], function($, PageFragment, SearchAggregator, YoutubeSource, Song){

    var SearchResultView = PageFragment.extend({
        initialize: function() {
            this.template = _.template($('#searchResultTemplate').html());
        }, 
        render: function() {
            this.$el.html(this.template({result: this.model}));
        }
    });

    var FakeSrc = function(query) {
        this.get = function(begin, size, cb){
           /* cb(null, new Song({
                title: "Fake song", 
                src: "fake"
            }));*/
        }

    };
    FakeSrc.title = "FakeSrc";

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
            
            this.addSrc(YoutubeSource);
            this.addSrc(FakeSrc);

            this.detectPageBottom();
        },
        addSrc: function(source) {
            this.searchAggregator.addSrc(source);
/*            var title = source.title;
            $('#selectSources').find('#select-'+title).click($.proxyfunction() {

            });*/
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
            }, this));
            this.queryIterator.on('error', function(err) {
                console.log("An error as occured while searching - "+err);
            })
            this.queryIterator.exec();
        }, 

        render: function () {
            /* Load initial results */
            console.log("rendering");
            var self = this;
            SearchAggregator.util.fetchResults(this.queryIterator, this.CHUNK_SIZE, {
                read: self.loadResult
            });

            this.$el.html(this.template({
                keywords: this.keywords, 
                sources: this.sources
            }));

            /* Dropdown sources menu <--------------------------- */
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
                    self.render();
                    return false;
                });
            });

            /* Loader (it will be hidden by loadResult) */
            this.loader = $('<img />')
                    .attr('src', '/app/img/ajax-loader.gif')
                    .attr('id', 'searchAjaxLoader')
                    .addClass('text-center')
                    .appendTo(this.$el);

            return this;
        }, 
        addSrc: function(source) {
            if(this.sources.indexOf(source) === -1) {
                this.sources.push(source);
            }
            this.searchAggregator.addSrc(source);
        }, 
        removeSrc: function(source) {
            var index = this.sources.indexOf(source);
            if(index != -1) {
                this.sources.slice(index, 1);
            }
            this.SearchAggregator.removeSrc(source);
        }, 

        disableSrc: function(source) {
            if(this.SearchAggregator) this.SearchAggregator.removeSrc(source);
        }
    });
});