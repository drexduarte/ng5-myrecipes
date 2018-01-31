import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { AngularFireAuth } from 'angularfire2/auth';


import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$
        .ofType(AuthActions.TRY_SIGNUP)
        .map((action: AuthActions.TrySignup) => {
            return action.payload;
        })
        .switchMap((authData: { username: string, password: string }) => {
            return fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(authData.username, authData.password));
        })
        .switchMap(() => {
            return fromPromise(this.afAuth.auth.currentUser.getIdToken());
        })
        .mergeMap((token: string) => {
            return [
                { type: AuthActions.LOGIN },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ];
        });

    @Effect()
    authSignin = this.actions$
        .ofType(AuthActions.TRY_SIGNIN)
        .map((action: AuthActions.TrySignin) => {
            return action.payload;
        })
        .switchMap((authData: { username: string, password: string }) => {
            return fromPromise(this.afAuth.auth.signInWithEmailAndPassword(authData.username, authData.password));
        })
        .switchMap(() => {
            return fromPromise(this.afAuth.auth.currentUser.getIdToken());
        })
        .mergeMap((token: string) => {
            return [
                { type: AuthActions.LOGIN },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ];
        });

    constructor(private actions$: Actions, private afAuth: AngularFireAuth) {}
}
