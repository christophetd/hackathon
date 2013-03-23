//class Song
module.exports = function (name,type,data,id){
	//name : string
	//"artist - title" or whatever
	this.name=name;
	//type : string
	//values : 'url', 'youtube', 'local', ...
	this.type=type;
	//data : string
	//path to the song, relative to the source
	this.data=data;
	//id : int
	//unique id of the song in the queue
	this.id=id;
}