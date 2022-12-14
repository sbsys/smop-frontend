/* react */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* types */
import { AdminStoreState } from 'admin/core';
import { SignInDTO, UserDTO } from '../types';

interface AuthState extends SignInDTO {
    isAuth: boolean;
}

const initialState: AuthState = {
    token: '',
    user: {} as UserDTO,
    isAuth: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authStoreSignIn: (state, { payload: { token, user } }: PayloadAction<SignInDTO>) => {
            state.token = token;
            state.user = user;
            state.isAuth = true;
        },
        authStoreSignOut: state => (state = initialState),
        authUpdateToken: (state, { payload }: PayloadAction<string>) => {
            state.token = payload;
        },
    },
});

export const AuthReducer = authSlice.reducer;

export const { authStoreSignIn, authStoreSignOut, authUpdateToken } = authSlice.actions;

export const selectAuthStore = (state: AdminStoreState) => state.auth;
