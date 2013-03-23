$(document).ready(function() {
    $('#addnew').click(function() {
    	var toAdd = $("input[name=search-1]").val();
        $('#messages').append("<p>"+toAdd+"</p>");
    });

    $('#refresh-1').click(function() {
        $('#message1').append("<p>"+"Hello world"+"</p>");
    });

    $('#refresh-2').click(function() {
        $('#message2').append("<p>"+"Hello world"+"</p>");
    });

});