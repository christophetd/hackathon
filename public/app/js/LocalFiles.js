//class LocalFiles
module.export = function(socket){
	this.list=[];
	//add() : void
	//path : string
	//adds the path into the list, avoiding doublons
	this.add=function(path){
		for(var p in list)
			if (p==path)
				return;
		this.list.push(path);
	}
	//remove() : void
	//path : string
	//removes the path from the list
	this.remove=function(path){
		for(var ind=0;ind<this.list.length;i++)
			if (p==path){
				this.list.splice(ind,1);
				return;
			}
	}
	//search () : string[]
	//words : string []
	//returns all the members of the list containing at least on of the words,
	//sorted by pertinence
	this.search=function(words){
		var scores = new Array(this.list.length);
		var results = [];
		for(var ind=0;ind<list.length;i++)
			for (word in word)
				if (this.list[ind].search(word)!=-1)
					scores[ind]++;
		for(var i = words.length;i>0;i--)
			for(var ind = 0; ind<scores.length ; ind++)
				if (scores[ind] == i)
					results.push(list[ind]);
		return results;
	}
	//get () : string []
	//returns the whole list
	this.get=function(){
		return list[];
	}
}