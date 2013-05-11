/*
    This view is displayed when a user first arrives to the website.
 */

define(['jquery', 'PageFragment'], function($, PageFragment){
    return PageFragment.extend({

        events:{
            'keydown :input': 'logKey'
        },
    
        initialize: function () {

        },
    

        render: function () {
            return this;
        },

        logKey: function(e){
            //e.preventDefault();
            if (e.keyCode == 13) {                 
                var toAdd = $('input[data-type="search"]').val();
                console.log(toAdd)
                
                //there must be a better thing to trigger the pagechange (?)
                location.hash = "#search/" + toAdd
                //Make a searchrequest
            };
        }
    });
});


