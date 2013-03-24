//class LocalSong
function LocalSong (file){
	//name : string
	//"artist - title" or whatever
	//var t = path.split('/').pop().split('\\').pop();
	//this.name = t.substr(0,t.lastIndexOf('.'));
	this.name=file.name;
	//type : string
	//values : 'url', 'youtube', 'local', ...
	this.type='local';
	//data : File
	//object File
	this.data=file;
	//id : int
	//unique id of the song in the queue
	this.id=0;
	//score : int
	//is incremented by the votes
	this.score=0;
	//picture : string
	//contains the path of the picture
	this.picture='';
}