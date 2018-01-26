import { CanActivate, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService) { }

    canActivate(): boolean {
        return this.authService.isAuthenticated();
    }

    canLoad(): boolean {
        return this.authService.isAuthenticated();
    }
}
