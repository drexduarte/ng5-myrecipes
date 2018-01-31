import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';


@Injectable()
export class AuthService {

    constructor(private afAuth: AngularFireAuth, private store: Store<fromApp.AppState>) {  }

    logout() {
        this.afAuth.auth.signOut();
        this.store.dispatch(new AuthActions.Logout());
    }
}
