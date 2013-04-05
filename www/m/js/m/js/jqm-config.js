

//Searchrequest if Enter is hit in filter form

$(document).delegate('[data-role="page"]', 'pageinit', function () {
        var _this = this
        $(_this).delegate('input[data-type="search"]', 'keydown', function (event) {
            //detect if enter was hit (13)
            if (event.which == 13) {
                event.preventDefault();
                var toAdd = $('input[data-type="search"]').val();
                //just to show that the value is saved in toAdd
                alert(toAdd);
                $.mobile.changePage( $("#search"), "slide", true, true);

                //Make a searchrequest
            };
        });
    });



// to use backbone as Router and not jqm
$(document).bind("mobileinit", function () {
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;

    // Remove page from DOM when it's being replaced
    $('div[data-role="page"]').live('pagehide', function (event, ui) {
        $(event.currentTarget).remove();
    });

    //page refresh function
    function refreshPage(page){
    // Page refresh
        page.trigger('pagecreate');
        page.listview('refresh');
    };
});