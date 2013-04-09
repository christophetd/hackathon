/*
    PageManager is a class managing page transitions.
*/
    
define(['jquery', 'jqm'], function($){
    
    /*
        The constructor takes the page's root id as an argument
    */
    return function(rootId){
        
        // Hash storing registered pages.
        var pages = {};
        
        var root;
        
        var currentPage;
        
        var isFirstPage = true;
        
        /*
            Replaces the main contents with the specified view, using jqm's transitions.
            view is a string associated to a specific view registered via registerPages.
        */
        this.changePage = function(pageName){
            if(!root) root = $(rootId);
            
            var page = pages[pageName];
            if(!page){
                console.log("error : page "+pageName+" does not exist");
                return;
            }
            
            //(de)activating views so that hidden pages does not consume ressources
            if(currentPage) currentPage.deactivate();
            page.activate();
            currentPage = page;
            
            var transition = $.mobile.defaultPageTransition;
            
            // We don't want to slide the first page
            if (isFirstPage) {
                transition = 'none';
                isFirstPage = false;
            }
            
            $.mobile.changePage(page.$el.selector, {changeHash:false, transition: transition});
        };
        
        /*
            Adds every pages from the hash to the manager's registered pages.
            Pages can be shown using changePage()
        */
        this.registerPages = function(hash){
            for(var i in hash){
                pages[i] = hash[i];
                pages[i].deactivate();
            }
        };
    };

});