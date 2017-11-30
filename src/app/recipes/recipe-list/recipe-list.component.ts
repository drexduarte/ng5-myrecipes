import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Test Recipe','Testing recipe','https://cdn.pixabay.com/photo/2016/05/21/04/37/pudding-1406386_960_720.jpg'),
    new Recipe('Test Recipe 2','Testing recipe 2','https://cdn.pixabay.com/photo/2016/05/21/04/37/pudding-1406386_960_720.jpg')
  ];

  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  selectRecipe(recipe: Recipe){
    this.recipeSelected.emit(recipe);
  }

}
