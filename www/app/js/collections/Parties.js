/*
    Collection of party models
*/

define(['models/Party', 'backbone'], function(Party){

    return Backbone.Collection.extend({
        model: Party,
        url: 'api/party/'
    });
});