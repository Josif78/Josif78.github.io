'use strict';

let app = {
    el: '#app',
    data: {
        ingredients: [],
        title: '',
        classification: '',
        ingredient: '',
        recipes: [
            {
                title: 'Hana',
                classification: 'Hoshido',
                ingredients: [
                    'Sakura'
                ]
            },
            {
                title: 'Camilla',
                classification: 'Nohr',
                ingredients: [
                    'Corrin',
                    'Xander',
                    'Leo',
                    'Elise'
                ]
            }
        ]
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
        setRecipe: function(recipe) {
            this.title = recipe.title;
            this.classification = recipe.classification;
            this.ingredients = recipe.ingredients;
        },
        saveRecipe: function(string) {
            if (string !== '') {
                let recipe = _.find(this.recipes, function(o) {
                    if (o.title === string) {
                        return o;
                    }
                });

                if (recipe === undefined) {
                    let newRecipe = {
                        title: this.title,
                        classification: this.classification,
                        ingredients: this.ingredients
                    }

                    this.recipes.push(newRecipe);
                }
                else {
                    recipe.title = this.title;
                    recipe.classification = this.classification;
                }
            }
            else {
                alert("Missing field: Recipe Name");
            }
        },
        deleteRecipe: function(string) {
            let recipe = _.find(this.recipes, function(o) {
                if (o.title === string) {
                    return o;
                }
            });

            this.recipes.$remove(recipe);
            this.title = this.classification = '';
            this.ingredients = [];
        },
        clearInputs: function() {
            this.title = this.classification = '';
            this.ingredients = [];
        }
    }
};


new Vue(app);