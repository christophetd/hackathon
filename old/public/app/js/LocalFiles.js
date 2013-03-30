//class LocalFiles
function LocalFiles(){
	this.list=[];
	//add() : void
	//path : File
	//adds the path into the list, avoiding doublons
	this.add=function(file){
		if(this.list.indexOf(file) == -1)
			this.list.push(file);
	}
	//remove() : void
	//path : File
	//removes the file from the list
	this.remove=function(file){
		for(var ind=0;ind<this.list.length;ind++)
			if (this.list[ind]==file){
				this.list.splice(ind,1);
				return;
			}
	}
	//search () : LocalSongs[]
	//words : string
	//returns all the members of the list containing at least on of the words (separated by spacies),
	//sorted by pertinence
	this.search=function(terms){
		var words = terms.split(' ');
		var scores=[];
		for (var i = 0 ; i < this.list.length; i++) scores.push(0);
		var results = [];
		for(var ind=0;ind<this.list.length;ind++)
			for (i in words)
				if (this.list[ind].name.toLowerCase().search(words[i].toLowerCase())!=-1)
					scores[ind]++;
		for(var i = words.length;i>0;i--)
			for(var ind = 0; ind<scores.length ; ind++)
				if (scores[ind] == i)
					results.push(new LocalSong(this.list[ind]));
		return results;
	}
	//get () : string []
	//returns the whole list
	this.get=function(title){
		//TODO : use something else than titles
		console.log('length : '+this.list.length);
		for(var i = 0 ; i < this.list.length ; i++){
			console.log(this.list[i].name+" <---> "+title);
			if(this.list[i].name == title)
				return this.list[i];
		}
		console.log("could not find local song : "+title);
	}
}