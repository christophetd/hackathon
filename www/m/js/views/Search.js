/*
    This view is displayed when a user first arrives to the website.
 */
define(['jquery', 'app', 'PageFragment', 'common/js/util/Search.js', 'common/js/util/YoutubeSource.js'], 
	function($, app, PageFragment, SearchAggregator, YoutubeSource){

		// make one list element

	var SearchResultView = PageFragment.extend({

        tagName: 'li',

        events: {
            'click [data-action=addToPlaylist]': 'onClick'
        },
        
        initialize: function() {
            _.bindAll(this, 'onClick');
            
            this.template = _.template($('#searchResultTemplate').html());
            console.log('SearchResultView init');
        }, 
        
        render: function() {
            listel = this.template({result: this.model})
            //this.setElement( $(listel) );
            this.$el.html(listel);

            
        },
        
        onClick: function(evt){
            evt.preventDefault();
            
            app.getParty().get('playlist').songs.add(this.model);
        }
    });

    return PageFragment.extend({

    	//$scrollingElement: $('#mainContainer'), 
        dataLoading: false,
        keywords: '', 
        CHUNK_SIZE: 20,
        sources: [], 
    
        initialize: function () {
        	 if(!app) app = require('app');
        	 //this.template = _.template($('#searchTemplate').html());
            _.bindAll(this, /*'detectPageBottom', 'bottomReached', */'loadResult', 'addSrc', 'removeSrc', 'disableSrc');

            this.searchAggregator = new SearchAggregator({
                    chunkSize: this.CHUNK_SIZE, 
                    preloadThreshold: 3
            });

            this.searchAggregator.addSrc(YoutubeSource);
            
            this.addSrc(YoutubeSource);
            //this.addSrc(FakeSrc);
            
            
            //this.detectPageBottom();

        },

        loadResult: function(result) {
            if(this.loader) this.loader.hide();
            
            var $result = new SearchResultView({
                model: result, 
            });
            $result.render();
            this.$('#dynamicResults').append($result.$el);

            this.$('#dynamicResults').listview('refresh');
            
            this.dataLoading = false;
        },
        /*
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
		*/

        search: function(keywords) {
            this.keywords = keywords;
            this.queryIterator = this.searchAggregator.query(this.keywords);

            this.queryIterator.on('end', $.proxy(function() {
                this.loader.hide();
                this.$el.find('#dynamicResults').append('No results were found.');
            }, this));
            this.queryIterator.on('error', function(err) {
                console.log("An error as occured while searching - "+err);
            })
            this.queryIterator.exec();
        }, 
    

        render: function () {


        	var self = this;
        	/*
            this.$el.html(this.template({
                keywords: this.keywords, 
                sources: this.sources
            }));*/
            
            /* Load initial results */
            SearchAggregator.util.fetchResults(this.queryIterator, this.CHUNK_SIZE, {
                read: self.loadResult
            });

            /* Loader (it will be hidden by loadResult) */
            this.loader = $('<img />')
                    .attr('src', '/app/img/ajax-loader.gif')
                    .attr('id', 'searchAjaxLoader')
                    .appendTo(this.$el);

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

