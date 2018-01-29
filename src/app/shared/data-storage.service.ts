import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {

    constructor(private httpClient: HttpClient, private recipeService: RecipeService) { }

    storeRecipes() {
        return this.httpClient.put('https://shark-recipes.firebaseio.com/recipes.json',
            this.recipeService.getRecipes());
    }

    getRecipes() {
        return this.httpClient.get<Recipe[]>('https://shark-recipes.firebaseio.com/recipes.json')
            .map((recipes) => {
                return recipes.map((recipe) => {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                    return recipe;
                });
            })
            .subscribe((recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            },
            (error: Response) => console.log(error));
    }
}
