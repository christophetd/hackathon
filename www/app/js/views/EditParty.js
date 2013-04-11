/*
    EditParty.js 
    This view allows the user to edit a party's properties.
*/
define(
    ['jquery', 'PageFragment', 'models/Party', 'backbone'], 
    function($, PageFragment, Party){

    return PageFragment.extend({
        
        events: {
            'submit .partyForm': 'save',
            'click .cancelBtn': 'cancel'
        },
        
        initialize: function(){
        
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
            
            // Update model's attributes
            this.model.set('name', this.$el.find('[name=partyName]').val());
            
            this.model.save(null, {
                success: $.proxy(function(){
                    window.location.hash = '#/show/'+this.model.id;
                }, this),
                
                error: function(){
                    console.log('uh oh');
                     window.location.hash = '#/';
                }
            });
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