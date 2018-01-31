import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as RecipeActions from '../store/recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromRecipe from './recipe.reducers';


@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .switchMap(() => {
            return this.httpClient.get<Recipe[]>('https://shark-recipes.firebaseio.com/recipes.json');
        })
        .map((recipes) => {
            recipes.map((recipe) => {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
                return recipe;
            });
            return {
                type: RecipeActions.SET_RECIPES,
                payload: recipes
            };
        });

    @Effect({ dispatch: false })
    recipeStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .withLatestFrom(this.store.select('recipes'))
        .switchMap(([, state]) => {
            return this.httpClient.put('https://shark-recipes.firebaseio.com/recipes.json', state.recipes);
        });
    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromRecipe.FeatureState>) { }
}
