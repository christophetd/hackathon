
var store = new (require('../util/memoryStore'));

module.exports = function(app){
    
    // Create
    app.post('/api/party', function(req, res){
        
        var party = req.body;
        // Warning : this is the worst thing you can do as a matter of security
        store.put('party', party, function(id){
            party.id = id;
            res.send('{"id":"'+id+'"}');
        });
        
    });
    
    // Read collection
    app.get('/api/party', function(req, res){

        store.get('party', function(parties){
            res.send(JSON.stringify(parties));
        });
    });
    
    // Read party
    app.get('/api/party/:id', function(req, res){
        
        store.get('party', req.params.id, function(party){
            res.send(JSON.stringify(party));
        });
        
       
    });
    
    // Update
    app.put('/api/party/:id', function(req, res){
        
        store.set('party', req.body);
        res.end();
    });
    
    // Delete
    app.del('/api/party/:id', function(req, res){
        store.destroy('party', req.params.id);
        res.end();
    });

}