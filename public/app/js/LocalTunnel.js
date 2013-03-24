//class LocalTunnel
function LocalTunnel(socket, localFiles){
	socket.on('source_query',function(data){
		console.log(data);
		var s = localFiles.search(data);
		console.log(s);
		socket.emit('source_search', s);
	})
}