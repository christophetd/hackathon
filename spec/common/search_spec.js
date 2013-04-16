require(["common/util/Search"], 
        function(Search){
        
    describe("Search aggregator", function(){
        /* We define these useful dummy sources for our tests */
        var IncSource = function(query){
            this.get = function(begin, size, cb){
                window.setTimeout(function(){
                    //For the test, we return an error if the search is "makerError"
                    if(query == "makeError"){ cb("Manually triggered error"); }
                    else {
                        var res = [];
                        for(var i = begin ; i < begin+size && i < 100 ; i++){
                            res.push(''+i);
                        }
                        cb(null, res);
                    }
                }, 100);
            }
        };
        IncSource.title = "inc";
        
        var RandomSource = function(query){
            this.get = function(begin, size, cb){
                window.setTimeout(function(){
                    var res = [];
                    for(var i = begin ; i < begin+size && i < 20 ; i++){
                        res.push(''+Math.random());
                    }
                    cb(null, res);
                }, 100);
            }
        };
        RandomSource.title = "rand";
        
        /* A function used to consume search results */
        function fetchResults(query, amount, cbs){
            if(!cbs) cbs = {};  //Callbacks
            for(var i = 0 ; i < amount ; i++){
                
                // There is no more data to be read or if an error occured
                if(query.isEnd()){
                    if(typeof(cbs.end) == 'function') cbs.end();
                }
                
                // The data we want is not yet loaded
                if(!query.hasNext()){
                    
                    // When new data comes, we try again reading our results
                    query.once('data', function(){fetchResults(query, amount - i, cbs)});
                    return;
                }
                
                // We read the next element
                var el = query.next();
                if(typeof(cbs.read) == 'function') cbs.read(el);
            }
            if(typeof(cbs.done) == 'function') cbs.done();
        }
    
        it("should accept single source addition and deletion", function(){
            var s = new Search();
            
            s.addSrc(RandomSource).addSrc(IncSource);
            
            expect(s.hasSource(RandomSource)).toBe(true);
            expect(s.hasSource(IncSource)).toBe(true);
            
            s.removeSrc(RandomSource);
            expect(s.hasSource(RandomSource)).toBe(false);
            expect(s.hasSource(IncSource)).toBe(true);
            
            s.addSrc(RandomSource);
            expect(s.hasSource(RandomSource)).toBe(true);
            
            s.removeSrc(RandomSource).removeSrc(IncSource);
            expect(s.hasSource(RandomSource)).toBe(false);
            expect(s.hasSource(IncSource)).toBe(false);
        });
        
        it("should accept multiple sources addition and deletion", function(){
            var s = new Search();
            
            s.addSrc([RandomSource, IncSource]);
            
            expect(s.hasSource(RandomSource)).toBe(true);
            expect(s.hasSource(IncSource)).toBe(true);
            
            s.removeSrc(RandomSource);
            expect(s.hasSource(RandomSource)).toBe(false);
            expect(s.hasSource(IncSource)).toBe(true);
            
            s.addSrc(RandomSource);
            expect(s.hasSource(RandomSource)).toBe(true);
            
            s.removeSrc([RandomSource, IncSource]);
            expect(s.hasSource(RandomSource)).toBe(false);
            expect(s.hasSource(IncSource)).toBe(false);
        });
        
        it("should trigger an error on both query object and search object", function(){
        
            var s = new Search();
            s.addSrc(IncSource);
            
            var q = s.query("makeError");
            
            var qError = false, sError = false;
            
            s.on('error', function(){
                sError = true;
            });
            q.on('error', function(){
                qError = true;
            });
            
            q.exec();
            waitsFor(function() {
                return qError && sError;
            }, "The Value should be incremented", 1500);
        });

        it("should configure the right chunk size", function(){
            var s = new Search({
                chunkSize: 42
            });
            s.addSrc([IncSource, RandomSource]);
            
            var q = s.query("foo");
            
            var testDone = false;

            q.once('data', function(){
                for(var i = 1 ; i <= 41 ; i++){
                    expect(q.hasNext()).toBe(true);
                    q.next();
                }
                expect(q.hasNext()).toBe(false);
                
                testDone = true;
            });
            
            q.exec();
            
            waitsFor(function(){
                return testDone;
            }, "data to be read", 500);
        });
        
        it("should configure the right preloadThreshold", function(){
            var s = new Search({
                chunkSize: 10,
                preloadThreshold: 3
            });
            s.addSrc([IncSource, RandomSource]);
            
            var q = s.query("foo");
            
            var testDone = false;

            q.once('data', function(){
                for(var i = 1 ; i <= 8 ; i++){
                    expect(q.hasNext()).toBe(true);
                    q.next();
                }
                
                //When the seventh result is fetched, preloading should start
                
                window.setTimeout(function(){
                    for(var i = 1 ; i <= 12 ; i++){
                        expect(q.hasNext()).toBe(true);
                        q.next();
                    }
                    expect(q.hasNext()).toBe(false);
                    testDone = true;
                }, 200);
            });
            
            q.exec();
            
            waitsFor(function(){
                return testDone;
            }, "data to be read", 1000);
        });
        
        it("should reach the end of all sources", function(){
            var s = new Search({
                chunkSize: 16
            });
            s.addSrc([IncSource, RandomSource]);
            
            var q = s.query("foo");
            
            var endEvt = false;

            q.on('end', function(){
                endEvt = true;
            });
            
            q.exec();
            
            waitsFor(function() {
                return endEvt && q.isEnd();
            }, "end to be reached", 1500);
            
            fetchResults(q, 1000);
        });
        
        it("should read the right results", function(){
            var s = new Search({
                chunkSize: 9
            });
            s.addSrc(IncSource);
            
            var q = s.query("foo");
            
            q.on('error', function(){
                endEvt = true;
            });
            q.exec();
            
            var end = false;;

            waitsFor(function() {
                return end;
            }, "all results to be fetched", 1500);
            
            var i = 0;
            fetchResults(q, 50, {
                read: function(el){
                    expect(el).toBe(''+(i++));
                },
                done: function(){
                    end = true;
                }
            });
        });
        
    });
});