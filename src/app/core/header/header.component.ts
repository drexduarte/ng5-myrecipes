import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = false;

  constructor(private dsService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
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

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  toggleColapsed() {
    this.collapsed = !this.collapsed;
  }
}
