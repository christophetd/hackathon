/*Example :
 new Sources.YoutubeSource().search("muse uprising",5,function(results){
 	console.log(results);
 });
 */ 
var http = require('http');
module.exports = {
	YoutubeSource : function(){
		//public search () : void
		//terms : string
		//nb : int
		//callback(results : string[])
		//gets the nb firsts results for the terms
		this.search=function(terms,nb,callback){
			terms=terms.replace(' ','+');
			var url="http://gdata.youtube.com/feeds/api/videos?alt=json&q="+terms;
			var urls=[];
			http.get(url, function(res) {
			  var data='';
			  res.on('data',function(chunk){
			  	data+=chunk;
			  })
			  res.on('end',function(){
			  	for(var i=0;i<nb;i++)
			  		urls.push(JSON.parse(data).feed.entry[i].link[0].href);
				callback (urls);
			  })
			});
		}
	}
};