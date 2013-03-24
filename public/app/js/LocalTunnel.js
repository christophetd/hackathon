//class LocalTunnel
function LocalTunnel(socket, localFiles){
	socket.on('source_query',function(data){
		socket.emit('source_search',localFiles.search(data));
	})
}