'use strict';

let app = {
    el: '#app',
    data: {
        ingredients: [],
        title: '',
        classification: '',
        ingredient: '',
        recipes: []
    },
    methods: {
        addIngredient: function() {
            let ingredient = this.ingredient;

            this.ingredients.push(ingredient);
        },
        deleteIngredient: function(string) {
            let ingredient = _.find(this.ingredients, function(o) {
                return o === string;
            });

            this.ingredients.$remove(ingredient);
        },
    }
};


new Vue(app);