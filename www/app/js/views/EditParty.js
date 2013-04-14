/*
    EditParty.js 
    This view allows the user to edit a party's properties.
*/
define(
    ['app', 'jquery', 'PageFragment', 'models/Party', 'backbone'], 
    function(app, $, PageFragment, Party){

    return PageFragment.extend({
        
        events: {
            'submit .partyForm': 'save',
            'click .cancelBtn': 'cancel'
        },
        
        initialize: function(){
            
            // Ensures the app is properly defined (there is a circular dependency here)
            if(!app) app = require('app');
            
            _.bindAll(this, 'save');
            
            // Gets the template from the DOM
            this.template = _.template($('#partyEditTemplate').html());
            
            this.isNew = false;
            
            // If we don't have a model associated, we generate one
            if(!this.model){
                this.model = new Party();
                this.isNew = true;
            }
        },
        
        save: function(evt){
            evt.preventDefault();
            evt.stopPropagation();
            
            // Getting data from the form
            var name = this.$el.find('#partyNameInput').val();
            
            // If no name was provided
            if(!name){
                // Use bootstrap's magic to display an error
                this.$el.find('#nameControlGroup').addClass('error')
                    .find('.helper')
                        .text('You must provide a name');
                
            // Else we can processe the data
            } else {
                // Update model's attributes
                this.model.set('name', name);
                
                /* We show the ajax loader and disable the submit button. 
                    We also get a reference to the loader image and submit button so that
                    we can restore their state later if something fails. */
                var loader = this.$el.find('.ajaxLoader').show();
                var button = this.$el.find('.submitBtn').attr('disabled', 'disabled');
                
                // If the model is new, we add it to the collection
                if(this.isNew){
                    app.parties.add(this.model);
                    this.isNew = false;
                }
                
                // Then we can save it
                this.model.save(null, {
                    
                    // If the model was saved successfully
                    success: $.proxy(function(){
                        window.location.hash = '#/show/'+this.model.id;
                    }, this),
                    
                    // Otherwise, we restore the form to it's enabled state.
                    error: $.proxy(function(){
                        button.removeAttr('disabled', '');
                        loader.hide();
                        
                        // Todo : show error
                    }, this)
                });
                
            }
            return false;
        },
        
        cancel: function(evt){
            evt.preventDefault();
            evt.stopPropagation();
            
            window.history.back();
            
            return false;
        },
        
        render: function(evt){

            this.$el.html(this.template({party: this.model.toJSON(), isNew: this.isNew}));
            return this;
        }
    });

});