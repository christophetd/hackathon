/*
    Router index
*/
module.exports = function(app){

    require('./api.js')(app);
    
    require('./static.js')(app);
    

}