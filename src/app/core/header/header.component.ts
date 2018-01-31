import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  collapsed = false;
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  saveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  fetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  toggleColapsed() {
    this.collapsed = !this.collapsed;
  }
}
