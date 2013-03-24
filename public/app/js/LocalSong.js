//class LocalSong
function LocalSong (path){
	//name : string
	//"artist - title" or whatever
	var t = path.split('/').pop().split('\\').pop();
	this.name = t.substr(0,t.lastIndexOf('.'));
	//type : string
	//values : 'url', 'youtube', 'local', ...
	this.type='local';
	//data : string
	//path to the song, relative to the source
	this.data=path;
	//id : int
	//unique id of the song in the queue
	this.id=0;
	//score : int
	//is incremented by the votes
	this.score=0;
	//picture : string
	//contains the path of the picture
	this.picture='';
	//getFile() : file
	//
}