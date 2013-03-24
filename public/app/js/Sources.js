function URLSource() {

	var _this = this;

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
			mimeType = "x-wav";
				break;
			case "wma": 
			mimeType = "x-ms-wma";
				break;
			default: 
				console.log("type error");
				mimeType = splitted[splitted.length-1];
		}
		 var html = '<audio controls autoplay preload>'
		 	+'<source src="'+song.data+'" />'
		 +'<embed height="50" width="100" src="'+song.data+'" >'
		 +'</audio>';

		song.play = function($container, autoload) {
			$container.html("");
			console.log("Playing song");
			console.log(song);
			//$container.html(html);
			$audio = $('<audio>', {
				controls: '', 
				preload: ''
			}).appendTo($container);
			if(autoload === true) {
				$audio.attr("autoplay", "");
			}
			$('<source/>', { src : song.data }).appendTo($audio);
			
			_this.audio = $audio;
			return $audio;

		};

		song.getCurrentTime = function() {
			return _this.audio[0].currentTime;
		}

		song.getDuration = function() {
			return _this.audio[0].duration;
		}
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