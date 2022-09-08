import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    },
});

export const AuthReducer = authSlice.reducer;

export const { authStoreSignIn, authStoreSignOut } = authSlice.actions;

export const selectAuthStore = (state: AdminStoreState) => state.auth;
