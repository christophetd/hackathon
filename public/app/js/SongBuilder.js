function URLSource() {

	var _this = this;
	var endCallback;

	this.buildSong = function(song, callback) {
		this.endCallback = callback;
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

		song.play = function($container) {

			$container.html("");
			$('<h2>').text(song.name).appendTo($container);
			console.log("Playing song");
			console.log(song);
			$audio = $('<audio>', {
				controls: '', 
				preload: '', 
				autoplay: ''
			}).appendTo($container);
			$('<source/>', { src : song.data }).appendTo($audio);
			_this.audio = $audio;
			_this.audio.bind("ended", function() {
				$container.html("");
				_this.endCallback();
			});
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
	var _this = this;
	var endCallback;



	this.buildSong = function(song, endCallback) {
		console.log("Building youtube song");
		console.log(song);
		if(song.type != "youtube") {
			console.log("Song type error : expected youtube, "+song.type+" got.");
			return;
		}
		_this.endCallback = endCallback;
		song.play = function($container) {
			$container.html("");
			$('<h2>').text(song.name).appendTo($container);
			$player = $('<object>', {
				type: 'application/x-shockwave-flash', 
				id: 'yt-player'
			}).attr('data', 'http://www.youtube.com/v/'+song.data+'?enablejsapi=1&amp;playerapiid=ytplayer&amp;version=3&amp;autoplay=1');
			$player.attr('width', 425);
			$player.attr('height', 356);
			$player.appendTo($container);
			$('<param />', {
				name: "allowScriptAccess", 
				value: "always"
			}).appendTo($player);
		}
	}

	window.onYouTubePlayerReady = function () { 
		console.log("Youtube player ready");
		document.getElementById('yt-player').addEventListener("onStateChange", "checkEnd");
	}

	window.checkEnd = function(state) { 
		if(state == 0) {
			$('#yt-player').remove();
			_this.endCallback();
		}
	}
}


  // <script type="text/javascript">

  //   var params = { allowScriptAccess: "always" };
  //   var atts = { id: "myytplayer" };
  //   swfobject.embedSWF("http://www.youtube.com/v/ExgFD8UYwfM?enablejsapi=1&playerapiid=ytplayer&version=3",
  //                      "ytapiplayer", "425", "356", "8", null, null, params, atts);
  //   function onYouTubePlayerReady() {
  //   	document.getElementById('myytplayer').addEventListener("onStateChange", "stateChange");
  //   }
  //   function stateChange(state) {
  //   	if(state == 0) {
  //   		alert("Video finished !");
  //   	}
  //   }

  // </script>
 