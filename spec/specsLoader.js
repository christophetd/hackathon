/*
    This piece of code is loaded via the test pages. 
    It defines some require stuff, loads the specs and executes them.

*/

requirejs.config({
    paths: {
        'socket.io': '/socket.io/lib/socket.io',
        'underscore': '/common/js/lib/underscore',
        'backbone': '/common/js/lib/backbone'
    }
});

require(['specs.js'], function(){

    
    /* --- Code from jasmine standalone spec runner --- */
    
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    var currentWindowOnload = window.onload;

    window.onload = function() {
        if (currentWindowOnload) {
            currentWindowOnload();
        }
        execJasmine();
    };

    function execJasmine() {
        jasmineEnv.execute();
    }
    
});