import { Router } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';


@Injectable()
export class AuthService implements OnDestroy {
    private loggedIn = false;
    private token = '';
    private authSubscription: Subscription;
    private tkSubscription: Subscription;

    constructor(private router: Router, private afAuth: AngularFireAuth) {
        this.authSubscription = this.afAuth.authState.subscribe(
            (auth) => {
              if (auth) {
                this.loggedIn = true;
                this.router.navigate(['/']);
              } else {
                this.loggedIn = false;
                this.token = '';
                this.router.navigate(['/signin']);
              }
        });
        this.tkSubscription = this.afAuth.idToken.subscribe(
            (token) => {
                 this.token = token;
            }
        );
     }

    signup(email: string, password: string) {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .catch( error => console.log(error.message) );
    }

    signin(email: string, password: string) {
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(() => this.router.navigate(['/']))
            .catch( error => console.log(error.message) );
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuthenticated() {
        return this.loggedIn;
    }

    getToken(): string {
        return this.token;
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
        this.tkSubscription.unsubscribe();
    }
}
