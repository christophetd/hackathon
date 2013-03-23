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
		song.id = id_counter;
		id_counter++;//je sais, j'aurais pu le faire en une ligne, mais c'est moins lisible, voilà
		this.list[this.list.length] = song;
	}
	//public upSong() : void
	//songid : id
	//move up the song defined by the id in the queue
	this.upSong=function(songid){
		var i=0;
		while (this.list[i].id!=songid) i++;
		//at this point i is the index of the song in the list
		//if it values 0 it is the top song,
		//if it values list.length your songid argument is invalid, bitch
		//in both of this cases nothing changes
		if(i!=0&&i!=this.list.length){
			//list[i-1] is the song that is now just after the selected song,
			//and which is going to be replaced by (not sure if correct english here)
			var tmp=this.list[i];
			this.list[i]=this.list[i-1];
			this.list[i-1]=tmp;
		} 
	}
}