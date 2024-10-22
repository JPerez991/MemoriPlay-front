import { createReducer, on } from '@ngrx/store';
import { loginResponse } from '../login/actions/login.actions';
import { startLoading, stopLoading } from './auth.actions';
import { registerResponse } from '../register/actions/register.actions';

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userLoggedIn: any | null;
  isLoading: boolean;
}

export const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  userLoggedIn: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialState,
  on(loginResponse, (state, { result }) => ({
    ...state,
    token: result.token ?? result.msg,
<<<<<<< HEAD
    isAuthenticated: result.data ? true : false,
=======
    isAuthenticated: result.msg ? false : true,
>>>>>>> 6e196c37a875af5c32bcf97bb1aa569203ca8f02
    userLoggedIn: result.data ?? null,
  })),
  on(startLoading, (state) => ({ ...state, isLoading: true })),
  on(stopLoading, (state) => ({ ...state, isLoading: false })),
  on(registerResponse, (state, { result }) => ({ ...state, token: result.msg }))
);
