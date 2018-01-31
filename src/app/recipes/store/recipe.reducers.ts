import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes: State;
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe('Humble Schnitzel', 'This schnitzel is very humble',
            'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG', [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe('Camemburger', 'You must not be so humble...', 'https://pbs.twimg.com/media/DJIYXQ3WAAE6JoW.jpg', [
            new Ingredient('Meat', 1),
            new Ingredient('Camembert Cheese', 1),
            new Ingredient('Hamburger Bun', 1)
        ])
    ]
};

export function recipeReducer(state = initialState, action: RecipeActions.Actions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case RecipeActions.UPDATE_RECIPE:
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            };
        case RecipeActions.DELETE_RECIPE:
            const newRecipes = [...state.recipes];
            newRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: newRecipes
            };
        default:
            return state;
    }
}
