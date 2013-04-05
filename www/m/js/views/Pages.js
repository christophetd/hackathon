window.HomeView = Backbone.View.extend({

    template:_.template($('#home').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.ShareView = Backbone.View.extend({

    template:_.template($('#share').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.SearchView = Backbone.View.extend({

    template:_.template($('#search').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});