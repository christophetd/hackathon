/*
    Unit tests for YoutubeSource
*/

require(['jquery', 'common/util/Search', 'common/util/YoutubeSource'], function($, Search, YoutubeSource){
	
    /* Very basic test showing that you can automatically test views thanks to jQuery */
    describe("Youtube source", function(){
        it("should provide consistent results", function(){
            var src = new YoutubeSource("Sorry for");
            
            src.get(0, 10, function(err, data){
                console.log(data);
            });
        });
    });
});