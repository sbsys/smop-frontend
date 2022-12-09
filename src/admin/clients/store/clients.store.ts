/* react */
import { createSlice /* , PayloadAction */ } from '@reduxjs/toolkit';
/* types */
import { AdminStoreState } from 'admin/core';

interface ClientsState {}

const initialState: ClientsState = {};

const ClientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {},
});

export const ClientsReducer = ClientsSlice.reducer;

export const {} = ClientsSlice.actions;

export const selectClientsStore = (state: AdminStoreState) => state.clients;
