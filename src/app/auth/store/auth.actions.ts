import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class Login implements Action {
    readonly type = LOGIN;
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;

    constructor(public payload: string) { }
}

export class TrySignup implements Action {
    readonly type = TRY_SIGNUP;

    constructor(public payload: { username: string, password: string }) { }
}

export class TrySignin implements Action {
    readonly type = TRY_SIGNIN;

    constructor(public payload: { username: string, password: string }) { }
}

export type Actions = Login |
    Logout |
    SetToken |
    TrySignup |
    TrySignin;
