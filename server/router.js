
module.exports = function(app){

    /*
        For now the router is really trivial and could be replaced by static file serving.
        But it can be extended to serve the app for more complex urls (see later).
    */
    
    app.get('/m', function(req, res, next){
        res.sendfile('html/mobile.html');
    });
    
	app.get('/', function(req, res, next){
        res.sendfile('html/desktop.html');
	});

}