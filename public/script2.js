$(document).bind('pageinit',function() {
    
	

    $('#refresh-1').click(refresh);

    //Search function
    $('#addnew').click(function() {
      var toAdd = $("input[name=search-1]").val();
        // modify string
        $.post('/api/hqhq/search', {q: toAdd, n: 4})
			.done(function(data) {
			console.log(data);
			data = JSON.parse(data);
			console.log(data.length);
			$('#dynamicResults').empty();
			
			for(var i = 0 ; i < data.length ; i++){
				var item = data[i];
				var liItem = $('<li id="' + item.id + '""></li>');
				liItem.click(function(){

					$.post('/api/hqhq/add', {item: item})
					.done(function(data) {
						console.log("Data Loaded: " + data);
					});
				});
				liItem.append($('<a href="#"> <img src="'+ item.picture + '">' + item.name + '</a>'));
				//liItem.append($('<a href="#">' + item.name + '</a>'));
				$('#dynamicResults').append(liItem);
			  
			}

			$('#dynamicResults').listview('refresh');
        });
    
    });

	$('#dynamicResults').listview();

});