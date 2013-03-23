//class Playlist
module.exports = function (){
	//list : Song []
	this.list= new Array();
	//private id_counter : int
	//autoincremented, id of the next song entering in the queue
	var id_counter = 1;
	//public addSong() : void
	//song : Song
	//Adds a song at the end of the queue
	this.addSong=function(song){
		this.list[this.list.length] = song;
	}
}