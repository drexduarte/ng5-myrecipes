import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = false;
  authState: Observable<fromAuth.State>;

  constructor(private dsService: DataStorageService, private authService: AuthService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  saveData() {
    this.dsService.storeRecipes().subscribe(
      (response: Response) => console.log(response),
      (error: Response) => console.log(error)
    );
  }

  fetchData() {
    this.dsService.getRecipes();
  }

  logout() {
    this.authService.logout();
  }

  toggleColapsed() {
    this.collapsed = !this.collapsed;
  }
}
