﻿
define(['jquery', 'common/models/Song'], function($, Song){
    
    function YoutubeSource(query){
        this.get = function(begin, size, cb){
            var regionID = 'US';
            var request = "http://gdata.youtube.com/feeds/api/videos?alt=json-in-script&q="+encodeURIComponent(query)
                        +"&start-index="+(begin+1)+"&max-results="+size;
            
            $.ajax({
                dataType: "jsonp",
                url: request,
                success: function(data){
                    console.log(data);
                    var res = [];
                    for(var i in data.feed.entry){
                        res.push(new Song({
                            title   :   data.feed.entry[i].title.$t,
                            src     :   'youtube',
                            thumb   :   data.feed.entry[i].media$group.media$thumbnail[1].url
                        }));
                    }
                    cb(null, res);
                },
                error: function(){
                    cb('network error');
                }
            });
        }
    
    }

    return YoutubeSource;
});