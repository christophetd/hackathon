/*
    Tests the model Song.js .
    It is executed both when testing mobile and desktop app.
*/
require(['/common/js/models/Song.js'], function(Song){
	
    
    //Example of test, does nothing useful
    describe("Sample spec", function(){
        
        it("should pass", function(){
            expect(typeof(new Song)).not.toBe('undefined');
        });


	});

});