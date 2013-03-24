$(document).bind('pageinit',function() {
    

    $('#refresh-1').click(function() {
        $.getJSON('test.json', function(data) {
  			
        $('#dynamicFieldList').empty()
 			  $('#dynamicFieldList').html();
        $.each(data, function(i, item) {
            var liItem = $('<li id="' + item.id + '"><a href="#">' + item.name + '<span class="ui-li-count">'+ item.score +'</span></a></li>');
            //Up function
            liItem.click(function(){
                $.post('/api/foo/up', {id: this.id})
                .done(function(data) {
                alert("Data Loaded: " + data);
                });
                alert(item);
            });
            
            liItem.append($('<a href="#">' + item.name + '</a>'));
            $('#dynamicFieldList').append(liItem);
          
        });
  			$('#dynamicFieldList').listview('refresh');
        });


    });

    //Search function
    $('#addnew').click(function() {
      var toAdd = $("input[name=search-1]").val();
        // modify string
        $.post('/api/foo/search', {q: toAdd})
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
            //liItem.data=item;
            liItem.append($('<a href="#">' + item.name + '</a>'));
            $('#dynamicResults').append(liItem);
          
        });

        $('#dynamicResults').listview('refresh');
        });
    
    });





});

$(document).ready(function(){
  $('#dynamicResults').listview();
  $('#dynamicFieldList').listview();
})



