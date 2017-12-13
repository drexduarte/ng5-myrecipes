import { Subject } from 'rxjs/Subject';

import { Ingredient } from './ingredient.model';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Sugar', 1),
        new Ingredient('Eggs', 3)
      ];

    constructor() { }

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.updateList();
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.updateList();
    }

    updateIngredient(index: number, updIngredient: Ingredient) {
        this.ingredients[index] = updIngredient;
        this.updateList();
    }

    deleteItem(index: number) {
        this.ingredients.splice(index, 1);
        this.updateList();
    }

    private updateList() {
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
