/*
    Tests the Home view . It is not very useful since Home view does nothing except display a bit of html
    for now. But it provides a good example of how to test views.
*/

require(['jquery', 'views/HomePage'], function($, HomeView){
	
    /* Very basic test showing that you can automatically test views thanks to jQuery */
    describe("Home view", function(){
        it("should display home view as is, without modifications", function(){
        
            var testEl = $('<div id="test_mainContents" />').appendTo('body');
            var home = new HomeView({el: '#test_mainContents'});
            
            home.render();
            
            expect(testEl.html).toBe($($('#homeTemplate').html()).html);
            
            testEl.remove();
        });
    });
});