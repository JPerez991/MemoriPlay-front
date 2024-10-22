import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthentication = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.userLoggedIn
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);
<<<<<<< HEAD

export const selectIsLoading = createSelector(
  selectAuthState,
  (state) => state.isLoading
);
=======
>>>>>>> 6e196c37a875af5c32bcf97bb1aa569203ca8f02
