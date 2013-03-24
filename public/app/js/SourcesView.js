function SourcesView(hash, localFiles){
	
	//HTML list holding search results in the library
	var list = $('#library_list');

	var lf = new LocalFiles();
	var YTsearch = function(toAdd, callback){
		$.post('/api/'+ hash +'/search', {q: toAdd, n: 6})
			.done(function(data) {
			data = JSON.parse(data);
			callback(data);
		});
	};

	$('#library_search').submit(function(evt){
		evt.preventDefault();

		var toAdd = $("#search").val();
		$('#library_dynamicResults').html("");
        var localresults = lf.search(toAdd);
        YTsearch(toAdd,function(youtuberesults){

	        var results = localresults.concat(youtuberesults);
	        for(var i in results) {
					var item = results[i];
					$p = $('<p>', {
						id: item.id
					}).after("<br />--");
					$a = $('<a>', {
						href: "#"
					}).html(item.name).click( (function(item) {
						return function() {
							$.post('/api/'+hash+'/add', { item: item});
							$('#search').val('');
							$('#library_dynamicResults').html("");
						}
					})(item));
					$img = $('<img />', {
						src: item.picture,
						width: '75%'
					}).appendTo($a);
					$a.appendTo($p);
					$('#library_dynamicResults').append($p);
	        };
		}
	)})
	//});
	

	$('#library_addFilesButton').click(function(){
		//TODO : add files to localFiles
		
	});
}
