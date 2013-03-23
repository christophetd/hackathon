//class Song
module.exports = function (name,type,data){
	//name : string
	//"artist - title" or whatever
	this.name=name;
	//type : string
	//values : 'url', 'youtube', 'local', ...
	this.type=type;
	//data : string
	//path to the song, relative to the source
	this.data=data;
}