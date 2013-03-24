$(document).bind('pageinit',function() {
    
	function refresh() {
        $.getJSON('/api/hqhq/getPlaylist', function(data) {
  			
        $('#dynamicFieldList').empty()
 			  $('#dynamicFieldList').html();
        $.each(data, function(i, item) {
            var liItem = $('<li id="' + item.id + '"><a href="#">' + item.name + '<span class="ui-li-count">'+ item.score +'</span></a></li>');
            //Up function
            liItem.click(function(){
                $.post('/api/hqhq/up', {id: item.id})
                .done(function(res) {
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
    $('#addnew').click(function() {
      var toAdd = $("input[name=search-1]").val();
        // modify string
        $.post('/api/hqhq/search', {q: toAdd, n: 4})
          .done(function(data) {
          alert("Data Loaded: " + data);
        });

        $.getJSON('test.json', function(data) {
      
          $('#dynamicResults').empty()
        $('#dynamicResults').html();
        $.each(data, function(i, item) {
            var liItem = $('<li id="' + item.id + '""></li>');
            liItem.click(function(){

                $.post('/api/foo/add', {id: item})
                .done(function(data) {
                alert("Data Loaded: " + data);
                });
                alert(item);
            });
            //liItem.append($('<a href="#"> <img src="'+ item.picture + '">' + item.name + '</a>'));
            liItem.append($('<a href="#">' + item.name + '</a>'));
            $('#dynamicResults').append(liItem);
          
        });

        $('#dynamicResults').listview('refresh');
        });
    
    });

	refresh();
	

});

$(document).ready(function(){
  $('#dynamicResults').listview();
  $('#dynamicFieldList').listview();
})



