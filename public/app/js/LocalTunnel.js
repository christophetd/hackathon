var LocalFiles = require('./LocalFiles.js');
//class LocalTunnel
module.exports = function(socket){
	socket.on('source_query',function(data){
		socket.emit('source_search',LocalFiles.search(data));
	})
}