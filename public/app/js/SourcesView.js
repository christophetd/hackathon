var _this;

function SourcesView(hash, localFiles){
	
	//HTML list holding search results in the library
	var list = $('#library_list');
	var lf = new LocalFiles();
	var YTsearch = function(toAdd){
		$.post('/api/'+ hash +'/search', {q: toAdd, n: 6})
			.done(function(data) {
			console.log(data);
			data = JSON.parse(data);
			console.log(data.length);
		});
	};

	$('#library_search').submit(function(evt){
		alert('submit');
		evt.preventDefault();

		var toAdd = $("input[id=appendedInputButton]").val();
        var localresults = lf.search(toAdd);
        var youtuberesults = YTsearch(toAdd);
        var results = localresults.concat(youtuberesults);
        alert('Hello!');
        for(var i = 0 ; i < results.length ; i++){
				var item = results[i];
				var liItem = $('<li id="' + item.id + '""></li>');
				liItem.append($('<a href="#">' + item.name + '</a>'));
				$('#library_dynamicResults').append(liItem);
			  
		}
		
		console.log("hello les pauvres");
		//TODO : implement search
		return false;
	});
	
	_this = this;
	
	this.openFiles = function(files){
		console.log(files[0]);
		$('#library_filesInput').replaceWith(
			$('<input style="overflow: hidden; width: 1000px; height: 1000px; opacity: 0; position: absolute;" id="library_filesInput" type="file" class="btn" accept="sound/*" multiple onchange="sourcesView.openFiles(this.files)" name="localFileSelection"/>')
		);
		
		for(var i = 0 ; i < files.length ; i++){
			localFiles.add(files[i]);
		}
	};
	
}

