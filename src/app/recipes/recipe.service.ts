import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/shopping-list.service';

@Injectable()
export class RecipeService {
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

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes.find((x) => x.id === id);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
    }

    toShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}
