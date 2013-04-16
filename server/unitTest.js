
/* 
    unitTest.js
    Enables in browser unit testing. Tests are jasmine spec files located in one of
    spec/m, spec/app or spec/common.
    They should test client-side code from www/m, www/app and www/common.
    
    To run the tests, navigate to /test to run "app" tests or /m/test to run "m" tests (mobile)
    "common" tests are executed both on /test and /m/test.
    
    --- how it works ---
    
    It serves the application's html page with the default app's javascript replaced by the spec loader.
    The spec loader loads then /specs.js which is the concatenation of every spec files (common + app 
    or common + m depending on the situation). Every dependencies are loaded thanks to require.js.
    Finally, the spec loader runs the tests, hopefully every test passes !
*/

var fs = require('fs');

module.exports = function(app){

    //Loads the app's html page and injects test code into it
	app.get(/\/(m\/)?test$/, function(req, res){
        
        var contents = fs.readFileSync((req.params[0]) ? 'html/mobile.html' : 'html/desktop.html');
        
        var resData = contents.toString().replace(/^((?:.|\r|\n)*)<\/head>((?:.|\r|\n)*)<script data-main="[a-zA-Z\/]+" src="[a-zA-Z\/.-]+require[a-zA-Z\/.-]+"><\/script>((?:.|\r|\n)*)$/, 
                '$1<link rel="stylesheet" type="text/css" href="/test/jasmine.css"><script type="text/javascript" src="/test/jasmine.js">'
                + '</script><script type="text/javascript" src="/test/jasmine-html.js"></script></head>$2'
                + '<script data-main="/'+((req.params[0]) ? 'm' : 'app')+'/js/specLoader" src="/common/js/lib/require-jquery.js"></script>$3');
        
		res.set('Content-Type', 'text/html');
        res.send(resData);
	});
    
    //Jasmine files needed by the html test page
	app.get(/test\/(jasmine\.css|jasmine\.js|jasmine-html\.js)/, function(req, res){
		res.sendfile('lib/jasmine-1.3.1/'+req.params[0]);
	});
    
    /*
        Javscript file that requires the specs and starts the tests.
    */
    app.get(/\/(m\/|app\/)?js\/specLoader\.js$/, function(req, res){
        res.sendfile('spec/specsLoader.js');
    });
    
    /* 
        Concatenates every spec files in /spec/client into one big
        spec loaded into the html test page so that every tests are run
        and extra tests can be added just by creating a new spec file, without 
        extra configuration.
    */
    app.get(/(\/|\/m\/)specs\.js/, function(req, res){
        
        res.set('Content-Type', 'text/javascript');
            
        var body = '';
        
        var commonFiles = fs.readdirSync('spec/common/');
        
        for(var i in commonFiles){
            if(/^[a-zA-Z_.-]+?[sS]pec\.js$/.test(commonFiles[i])){
                
                body += fs.readFileSync('spec/common/'+commonFiles[i]);
            }
        }
        
        var appDir = 'spec/'+((req.params[0] == '/')? 'app/' : 'm/');
        var appFiles = fs.readdirSync(appDir);
        
        for(var i in appFiles){
            if(/^[a-zA-Z_.-]+?[sS]pec\.js$/.test(appFiles[i])){
                
                body += fs.readFileSync(appDir+appFiles[i]);
            }
        }
        
        res.send(body);
        
    });
};