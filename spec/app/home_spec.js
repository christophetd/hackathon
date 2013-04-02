/*
    Tests the Home view . It is not very useful since Home view does nothing except display a bit of html
    for now. But it provides a good example of how to test views.
*/

require(['jquery', 'app/js/views/Home'], function($, HomeView){
	
    /* Very basic test showing that you can automatically test views thanks to jQuery */
    describe("Home view", function(){
        it("should display home view as is, without modifications", function(){
            var home = new HomeView({el: '#mainContents'});
            
            home.render();
            
            expect($('#mainContents').html).toBe($($('#homeTemplate').html()).html);
        });
    });
});