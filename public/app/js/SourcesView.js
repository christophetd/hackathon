function SourcesView(hash, localFiles){
	
	//HTML list holding search results in the library
	var list = $('#library_list');

	var lf = new LocalFiles();
	var YTsearch = function(toAdd, callback){
		$.post('/api/'+ hash +'/search', {q: toAdd, n: 6})
			.done(function(data) {
			alert(data);
			data = JSON.parse(data);
			callback(data)
		});
	};

	$('#library_search').submit(function(evt){
		evt.preventDefault();

		var toAdd = $("input[id=appendedInputButton]").val();
        var localresults = lf.search(toAdd);
        YTsearch(toAdd,function(youtuberesults){

	        var results = localresults.concat(youtuberesults);
	        alert("RESULTS :"+results);
	        for(var i = 0 ; i < results.length ; i++){
	        		alert(results[i]);
					var item = results[i];
					var liItem = $('<li id="' + item.id + '""></li>');
					liItem.append($('<a href="#">' + item.name + '</a>'));
					$('#library_dynamicResults').append(liItem);
	        };
		}
	)})
	//});
	

	$('#library_addFilesButton').click(function(){
		//TODO : add files to localFiles
		
	});
}
