$(document).bind('pageinit',function() {
    

    var phash = window.location.search.replace(/\?p=(.+)/, '$1');
	
 	alert('blajdlkjafs1');

    //Search function
    $('#sub2').submit(function() {
    	alert('blajdlkjafs');
      var toAdd = $("input[name=search-1]").val();
        
        var lf = new LocalFiles();
        var localresults = lf.search(toAdd);
        for(var i = 0 ; i < localresults.length ; i++){
				var item = localresults[i];
				var liItem = $('<li id="' + item.id + '""></li>');
				liItem.click((function(item){
					return function(){

					$.post('/api/'+phash+'/add', {item: item})
					.done(function(localresults) {
						console.log("Data Loaded: " + localresults);
					});
				}})(item));
				//liItem.append($('<a href="#"> <img src="'+ item.picture + '">' + item.name + '</a>'));
				liItem.append($('<a href="#">' + item.name + '</a>'));
				$('#dynamicResults').append(liItem);
			  
			}
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
					});
				}})(item));
				liItem.append($('<a href="#">' + item.name + '</a>'));
				//liItem.append($('<a href="#">' + item.name + '</a>'));
				$('#dynamicResults').append(liItem);
			  
			}

			$('#dynamicResults').listview('refresh');
        });
		return false;
    
    });

	

});
     