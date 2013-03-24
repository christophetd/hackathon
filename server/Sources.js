/*Example :
 new Sources.YoutubeSource().search("muse uprising",5,function(results){
 	console.log(results);
 });
 */ 
var http = require('http');
var Song = require('./Song.js');
module.exports = {
	YoutubeSource : function(){
		//public search () : void
		//terms : string
		//nb : int
		//callback(results : Song[])
		//gets the nb firsts results for the terms
		this.search=function(terms,nb,callback){
			terms=terms.replace(' ','+');
			var url="http://gdata.youtube.com/feeds/api/videos?alt=json&q="+terms;
			var songs=[];
			http.get(url, function(res) {
			  var data='';
			  res.on('data',function(chunk){
			  	data+=chunk;
			  })
			  res.on('end',function(){
			  	for(var i=0;i<nb;i++){
			  		songs.push (new Song(
			  			JSON.parse(data).feed.entry[i].title.$t,
			  			'youtube',
			  			JSON.parse(data).feed.entry[i].link[0].href
			  		));
			  	}
				callback (songs);
			  })
			});
		}
	}
};