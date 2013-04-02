/*
    Tests if the server-side mobile redirection works properly.
*/

describe('Mobile device redirection', function(){
    var mobileRedirect = require('../../server/mobileRedirect.js');

    var req, res, nextSpy;
    
    beforeEach(function() {
        req = {
        
            headers: {
                'user-agent': 'Mozilla/5.0 (Linux; U; Android 2.3.7; fr-fr; SonyEricssonST25i Build/6.0.B.3.184) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
            },
            
            path: '/'
        };
        
        res = {
            writeHead: function(c, h){
            },
            
            end: function(){
            
            }
        
        };
        
        nextSpy = {next: function(){}};

        spyOn(res, 'end');
        spyOn(res, 'writeHead');
        spyOn(nextSpy, 'next');
    });
    
    it('should redirect mobile users to /m/', function(){
        
        req.path = '/';
        
        (mobileRedirect('m', 'api'))(req, res, nextSpy.next);
        
        expect(res.end).toHaveBeenCalled();
        expect(res.writeHead).toHaveBeenCalledWith(302, {Location: '/m/'});
        expect(nextSpy.next).not.toHaveBeenCalled();
    });
    
    it('should not redirect mobile users', function(){
        
        req.path = '/api/foobar';
        
        (mobileRedirect('m', 'api'))(req, res, nextSpy.next);
        
        expect(res.end).not.toHaveBeenCalled();
        expect(res.writeHead).not.toHaveBeenCalled();
        expect(nextSpy.next).toHaveBeenCalled();
    });
    
    it('should redirect mobile users to /m/index', function(){
        
        req.path = '/index';
        
        (mobileRedirect('m', 'api'))(req, res, nextSpy.next);
        
        expect(res.end).toHaveBeenCalled();
        expect(res.writeHead).toHaveBeenCalledWith(302, {Location: '/m/index'});
        expect(nextSpy.next).not.toHaveBeenCalled();
    });
    
    afterEach(function(){
        
    });

});