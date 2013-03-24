$(document).bind('pageinit',function() {
    $('#addnew').click(function() {
    	var toAdd = $("input[name=search-1]").val();
        $('#messages').append("<p>"+toAdd+"</p>");
    });

    $('#refresh-1').click(function() {
        $.getJSON('test.json', function(data) {
  			var items = [];
 			
  			//Modify Vote-list

  			items.push('<ul id="dynamicFieldList" data-role="listview" data-icon="arrow-u" data-filter="true" data-filter-placeholder="Search for music.." data-count-theme="c">');
 			
  			$.each(data, function(i, item) {
    			items.push('<li id="' + item.id + '"><a href="#">' + item.name + '<span class="ui-li-count">'+ item.score +'</span></a></li>'); 
  			});

  			items.push('</ul>');

  			$('#votelist').empty().append(items.join(''));

        $('#dynamicFieldList').listview();
    });
});
    // Up Post Function, this.id 
    $("#dynamicFieldList li").click(function() {
        $.post('/api/foo/up', {id: 0})
          .done(function(data) {
          alert("Data Loaded: " + data);
        });
    });



});



