import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/shopping-list.service';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(1, 'Humble Schnitzel', 'This schnitzel is very humble',
            'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG', [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(2, 'Camemburger', 'You must not be so humble...', 'https://pbs.twimg.com/media/DJIYXQ3WAAE6JoW.jpg', [
            new Ingredient('Meat', 1),
            new Ingredient('Camembert Cheese', 1),
            new Ingredient('Hamburger Bun', 1)
        ])
    ];

    constructor(private shoppingListService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.updateList();
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes.find((x) => x.id === id);
    }

    addRecipe(recipe: Recipe) {
        recipe.id = Math.max(...this.recipes.map((x) => x.id)) + 1;
        this.recipes.push(recipe);
        this.updateList();
    }

    updateRecipe(id: number, newRecipe: Recipe) {
        newRecipe.id = id;
        const index = this.recipes.findIndex((x) => x.id === id);
        this.recipes[index] = newRecipe;
        this.updateList();
    }

    deleteRecipe(id: number) {
        this.recipes.splice(this.recipes.findIndex((x) => x.id === id), 1);
        this.updateList();
    }

    toShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    private updateList() {
        this.recipesChanged.next(this.recipes.slice());
    }
}
