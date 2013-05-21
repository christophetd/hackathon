/*
    This view is displayed when a user first arrives to the website.
 */

define(['jquery', 'PageFragment'], function($, PageFragment){
    return PageFragment.extend({

        events:{
            'keydown :input': 'logKey',
            //'submit' : 'joinparty'
        },
    
        initialize: function () {

        },
    

        render: function () {
            return this;
        },

        logKey: function(e){
            //e.preventDefault();
            if (e.keyCode == 13) {                 
                var party = $('input[data-label="login"]').val();
                //there must be a better thing to trigger the pagechange (?)
                console.log('Joinparty');
                this.joinparty(party);
            };
        },
        joinparty: function(party){
            location.hash = "home/";
            //location.hash = party  + "/#home/";
        }
    });
});