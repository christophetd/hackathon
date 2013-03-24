var socket = io.connect('/');
var apikey = '';
socket.on('party_initialized', function (data) {
	apikey = data.apiKey;
	var playlist = new PlaylistView(socket);
	var player = new Player(socket, playlist);
	var qr = new QRtag();
	qr.target("qr-container");
	qr.size(250);
	qr.border(10);
	qr.data("http://128.179.140.92:5000/mobile/?p="+apikey);
	qr.image();

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




