import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class AuthService {
    private token: string;

    constructor(private router: Router) { }

    signup(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error.message)
            );
    }

    signin(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => firebase.auth().currentUser.getIdToken()
                .then(
                    (token: string) => this.token = token
                ))
            .catch(error => console.log(error.message));
        this.router.navigate(['/']);
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }
}
