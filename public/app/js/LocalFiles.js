//class LocalFiles
module.exports = function(socket){
	this.list=[];
	//add() : void
	//path : string
	//adds the path into the list, avoiding doublons
	this.add=function(path){
		for(var i in this.list)
			if (this.list[i]==path)
				return;
		this.list.push(path);
	}
	//remove() : void
	//path : string
	//removes the path from the list
	this.remove=function(path){
		for(var ind=0;ind<this.list.length;ind++)
			if (this.list[ind]==path){
				this.list.splice(ind,1);
				return;
			}
	}
	//search () : string[]
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
				if (this.list[ind].toLowerCase().search(words[i].toLowerCase())!=-1)
					scores[ind]++;
		for(var i = words.length;i>0;i--)
			for(var ind = 0; ind<scores.length ; ind++)
				if (scores[ind] == i)
					results.push(this.list[ind]);
		return results;
	}
	//get () : string []
	//returns the whole list
	this.get=function(){
		return this.list;
	}
}