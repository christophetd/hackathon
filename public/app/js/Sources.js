function URLSource() {

	this.buildSong = function(song) {
		if(song.type != "url")  {
			console.log("Song type error : expected url, "+song.type+" got.");
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
			mimeType = "x-ms-wma";
				break;
			default: 
				console.log("type error");
				mimeType = splitted[splitted.length-1];
		}
		var html = 
		'<audio controls>
			<source src="'+song.data+'" type="audio/'+mimeType+'">
		Your browser does not support audio html5 element. Get a real one.
		</audio>
		';
		song.play = function($container) {
			console.log("Playing song");
			console.log(song);
			$container.html(html);
		};
	}
}

function YoutubeSource() {

}