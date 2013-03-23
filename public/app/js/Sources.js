function URLSource() {
	this.buildSong = function(song) {
		if(song.type != "url")  {
			console.log("Song type error : expected url, "+song.type+" got.");
			return;
		}
		
		var splitted = song.data.split("."), mimeType = "";
		switch(splitted[splitted.length-1]) {
			case "mp3": 
			mimeType = "mpeg";
				break;
			case "wav": 
			mimeType = "wave";
				break;
			case "wma": 
			mimeType = "wma";
				break;
			default: 
				console.log("type error");
				mimeType = splitted[splitted.length-1];
		}
		var html = '<audio controls autoplay preload>'
			+'<source src="'+song.data+'" type="audio/'+mimeType+'" >'
		+'Your browser does not support audio html5 element. Get a real one.'
		+'<embed height="50" width="100" src="'+song.data+'" >'
		+'</audio>';
		
		song.play = function($container) {
			console.log("Playing song");
			console.log(song);
			$container.html(html);
		};
	}
}

function YoutubeSource() {
	this.buildSong = function(song) {
		if(song.type != "youtube") {
			console.log("Song type error : expected youtube, "+song.type+" got.");
			return;
		}
		var html = '<iframe width="560" height="315" src="'+song.data+'" frameborder="0" allowfullscreen></iframe>';
		song.play = function($container) {
			console.log("Playing song");
			console.log(song);
			$container.html(html);
		}
	}
}