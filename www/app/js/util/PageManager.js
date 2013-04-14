/*
    PageManager is a class managing page transitions.
*/
    
define(['jquery'], function($){
    
    /*
        The constructor takes the page's root id as an argument
    */
    return function(rootId){
        
        // Hash storing registered pages.
        var pages = {};
        
        var root = $(rootId);
        
        var currentPage;
        
        var isFirstPage = true;
        
        /*
            Replaces the main contents with the specified view, using jqm's transitions.
            view is a string associated to a specific view registered via registerPages.
        */
        this.changePage = function(page){
            
            if(typeof(page) == 'string'){
                page = pages[page];
            }
            
            //(de)activating views so that hidden pages does not consume ressources
            if(currentPage) currentPage.deactivate();
            page.activate();
            currentPage = page;
            
            root.children().detach();
            root.append(currentPage.$el);
        };
        
        this.setBlankPage = function(){
            console.log("blanking");
            if(currentPage) currentPage.deactivate();
            currentPage = null;
            
            root.children().detach();
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