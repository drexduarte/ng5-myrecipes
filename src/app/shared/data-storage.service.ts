import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

    constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes() {
        const token = this.authService.getToken();
        return this.http.put('https://shark-recipes.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken();

        return this.http.get('https://shark-recipes.firebaseio.com/recipes.json?auth=' + token)
            .map((response: Response) => {
                const recipes = response.json();
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
