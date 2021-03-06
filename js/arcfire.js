'use strict';
const url = 'https://arcfire-recipes.firebaseio.com';

let app = new Vue({
    el: '#app',
    data: {
        id: '',
        title: '',
        classification: '',
        ingredients: [],
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
        getLargestID: function() {
            let max = _.reduce(this.recipes, function(temp, recipe) {
                    return Number(recipe.id)>temp? Number(recipe.id): temp;
            }, 0);

            return max+1;
        },
        setRecipe: function(recipe) {
            this.id = recipe.id;
            this.title = recipe.title;
            this.classification = recipe.classification;
            this.ingredient = '';
            this.ingredients = '';

            if(_.isNull(recipe.ingredients)) {
                this.ingredients = [];
            }
            else {
                this.ingredients = recipe.ingredients.concat([]);
            }
        },
        saveRecipe: function(string) {
            //console.log(this.getLargestID());
            if (this.title !== '') {
                let recipe = _.find(this.recipes, function(o) {
                    if (o.id === string) {
                        return o;
                    }
                });

                if (typeof (this.recipes) !== typeof ([])) {
                    this.recipes = [];
                }

                    //add new recipe
                if (recipe === undefined) {
                    let temp = this.ingredients.length>0? this.ingredients: '';
                    let newRecipe = {

                        id: this.getLargestID(),
                        title: this.title,
                        classification: this.classification,
                        ingredients: temp
                    }
                    if(_.isNull(this.recipes)) {
                        this.recipes = [];
                    }

                    this.recipes.push(newRecipe);
                    Recipes.set(this.recipes);
                }
                    //edit existing recipe
                else {
                    recipe.title = this.title;
                    recipe.classification = this.classification;
                    recipe.ingredients = this.ingredients;
                    Recipes.set(this.recipes);
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
            this.clearInputs();
            Recipes.set(this.recipes);
        },
        clearInputs: function() {
            this.id = this.title = this.classification = this.ingredient = '';
            this.ingredients = [];
        }
    }
});

let Recipes = new Firebase(url);

function yeah(snapshot) {
  app.recipes = snapshot.val();
}

Recipes.on('value', yeah);
Recipes.on('child_added', yeah);
Recipes.on('child_removed', yeah);
Recipes.on('child_changed', yeah);
