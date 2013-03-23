//class Playlist
var Playlist =  function (){
	//list : Song []
	this.list= new Array();
	//private id_counter : int
	//autoincremented, id of the next song entering in the queue
	var id_counter = 1;
	//public addSong() : void
	//song : Song
	//Adds a song at the end of the queue
	this.addSong=function(song){
		song.id = id_counter;
		id_counter++;//je sais, j'aurais pu le faire en une ligne, mais c'est moins lisible, voilà
		this.list[this.list.length] = song;
	}
	//private seekSong() : int
	//songid : int
	//returns the index of the song defined by songid
	//returns -1 if the song isn't found
	var seekSong=function(songid){
		var i=0;
		while (this.list[i].id!=songid) i++;
		//at this point i is the index of the song in the list
		//if it values 0 it is the top song,
		//if it values list.length your songid argument is invalid, bitch
		return (i!=this.list.length)?i:-1;
	}
	//private upSong() : void
	//songid : id
	//moves up the song defined by the id in the queue
	var upSong=function(songid){
		var ind = seekSong(songid);
		if (ind>=1){
			//list[ind-1] is the song that is now just after the selected song,
			//and which is going to be replaced by (not sure if correct english here)
			var tmp=this.list[ind];
			this.list[ind]=this.list[ind-1];
			this.list[ind-1]=tmp;
		}
	}
}

var events = require("events")
Playlist.prototype = new events.EventEmitter;
module.exports = Playlist;