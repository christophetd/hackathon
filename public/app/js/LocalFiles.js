//class LocalFiles
module.export = function(socket){
	this.list=[];

	this.search(words){
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
}