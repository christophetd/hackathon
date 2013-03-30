var socket = io.connect('/');
var apikey = '';
socket.on('party_initialized', function (data) {
	var apiKey = data.apiKey;
	
	var localFiles = new LocalFiles();
	var localTunnel = new LocalTunnel(socket, localFiles);
	var playlist = new PlaylistView(socket);
	var player = new Player(socket, playlist, localFiles);
	
	sourcesView = new SourcesView(apiKey, localFiles);
	var link = "http://"+window.location.host+"/mobile/?p="+apiKey;
	var qr = new QRtag();
	qr.target("qr-container");
	qr.size(250);
	qr.border(10);
	qr.data(link);
	qr.image();
	
	$('#link-container').html('<a href="'+link+'">'+link+'</a>');

	playlist.set(data);
	
	console.log(data.apiKey);
});


socket.on('error', function(msg){
	if(msg == 'invalid hash'){
		window.location.href = '/end';
	} else if(msg == 'socket already init'){
	
	} else if(msg == 'other instance took control'){
	
	} else {
		//TODO : unhandeled error
	}
});

socket.emit("party_init", getCookie('partyHash'));




