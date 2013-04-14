/*
    Collection of party models (not used currently)
*/

define(['models/Party', 'backbone'], function(Party){

    return Backbone.Collection.extend({
        model: Party,
        url: 'api/party/'
    });
});