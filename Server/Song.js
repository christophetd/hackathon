//class Song
module.exports = function (name,data,type){
	//name : string
	//"artist - title" or whatever
	this.name=name;
	//data : string
	//path to the song, relative to the source
	this.data=data;
	//type : string
	//
	this.type=type;
}