var LocalFiles = require('./LocalFiles.js');
//class LocalTunnel
module.exports = function(socket){
	socket.on('source_query',function(data){
		var terms = data.split(' ');
		socket.emit('source_search',LocalFiles.search(terms));
	})
}