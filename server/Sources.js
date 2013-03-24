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
			  	var parsed=JSON.parse(data).feed.entry;
				if(typeof(parsed) !== 'undefined'){
					for(var i=0;i<parsed.length && i<nb;i++){
						songs.push (new Song(
							parsed[i].title.$t,
							'youtube',
							parsed[i].link[0].href.replace(/.+v=(.+)/, '$1'),
							parsed[0].media$group.media$thumbnail[0].url
						));
					}
					callback (songs);
				}
			  })
			});
		}
	},
	// MP3SkullSource : function(){
	// 	this.search=function(terms,nb,callback){
	// 		terms=terms.replace(' ','_');
	// 		var url="http://mp3skull.com/mp3/"+terms+".html";
	// 		var songs=[];
	// 		http.get(url, function(res){
	// 			var data='';
	// 			res.on('data',function(chunk){
	// 				data+=chunk;
	// 			})
	// 			res.on('end',function(){
	// 				var vals=data.split('"');
	// 				var i = 0
	// 				while (i<vals.length&&i<nb){
	// 					if (vals[i].substr(vals[i].length-4)==".mp3")
	// 						i++;
	// 					else
	// 						vals.splice(i,1);
	// 				}
	// 			})
	// 		})
	// 	}
	// },
	LocalSource : function(){
		this.search=function(terms,nb,callback,party){
			var socket=party.socket;
			var songs = [];
			socket.emit('source_query',terms);
			socket.on('source_search',function(data){
				data=data.slice(0,nb);
				for(var d in data)
					songs.push(new Song(d.split('/').pop(),'local',d));
				callback(data);
			});
		}
	}
};