//class Playlist
module.exports = function (){
	//list : Song []
	this.list= new Array();
	//public addSong() : void
	//song : Song
	//Adds a song at the end of the queue
	this.addSong=function(song){
		this.list[this.list.length] = song;
	}
}