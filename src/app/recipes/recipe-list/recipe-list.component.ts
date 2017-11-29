import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Test Recipe','Testing recipe','https://cdn.pixabay.com/photo/2016/05/21/04/37/pudding-1406386_960_720.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
