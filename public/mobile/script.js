$(document).bind('pageinit',function() {
    

    var phash = window.location.search.replace(/\?p=(.+)/, '$1');
	
  
	function refresh() {
        $.getJSON('/api/'+ phash +'/getPlaylist', function(data) {
		
			$('#dynamicFieldList').empty();
			
			$.each(data, function(i, item) {
				var liItem = $('<li id="' + item.id + '"><a href="#">' + item.name + '<span class="ui-li-count">'+ item.score +'</span></a></li>');
				//Up function
				liItem.click(function(){
					$.post('/api/'+phash+'/up', {id: item.id})
					.done(function(res) {
						res = JSON.parse(res);
						if(res.error){
							alert("Error: " + res.error);
						} else {
							refresh();
						}
					});
				});
				
				liItem.append($('<a href="#">' + item.name + '</a>'));
				$('#dynamicFieldList').append(liItem);
			  
			});
  			$('#dynamicFieldList').listview('refresh');
        });


    }

    $('#refresh-1').click(refresh);

    //Search function
    $('#sub').submit(function() {
      var toAdd = $("input[name=search-1]").val();
        // modify string
        $.post('/api/'+phash+'/search', {q: toAdd, n: 6})
			.done(function(data) {
			console.log(data);
			data = JSON.parse(data);
			console.log(data.length);
			$('#dynamicResults').empty();
			
			for(var i = 0 ; i < data.length ; i++){
				var item = data[i];
				var liItem = $('<li id="' + item.id + '""></li>');
				liItem.click((function(item){
					return function(){

					$.post('/api/'+phash+'/add', {item: item})
					.done(function(data) {
						console.log("Data Loaded: " + data);
					refresh();
					});
				}})(item));
				liItem.append($('<a href="#"> <img src="'+ item.picture + '">' + item.name + '</a>'));
				//liItem.append($('<a href="#">' + item.name + '</a>'));
				$('#dynamicResults').append(liItem);
			  
			}

			$('#dynamicResults').listview('refresh');
        });
		return false;
    
    });

	if(window.location.hash === '#New'){
		$('#dynamicResults').listview();
	} else {
		$('#dynamicFieldList').listview();
		refresh();
	}


	

});



