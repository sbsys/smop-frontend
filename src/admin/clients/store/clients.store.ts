/* react */
import { createSlice /* , PayloadAction */, PayloadAction } from '@reduxjs/toolkit';
/* types */
import { AdminStoreState } from 'admin/core';
import { CommerceDetail, OrganizationDetail } from '../types';

interface ClientsState {
    organization: OrganizationDetail | null;
    currentCommerce: CommerceDetail | null;
}

const initialState: ClientsState = {
    organization: null,
    currentCommerce: null,
};

const ClientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        clientsStoreSetOrganization: (state, { payload }: PayloadAction<OrganizationDetail>) => {
            state.organization = payload;
        },
        clientsStoreSetCurrentCommerce: (state, { payload }: PayloadAction<CommerceDetail>) => {
            state.currentCommerce = payload;
        },
    },
});

export const ClientsReducer = ClientsSlice.reducer;

export const { clientsStoreSetOrganization, clientsStoreSetCurrentCommerce } = ClientsSlice.actions;

export const selectClientsStore = (state: AdminStoreState) => state.clients;

export const selectOrganization = (state: AdminStoreState) => state.clients.organization;

export const selectCurrentCommerce = (state: AdminStoreState) => state.clients.currentCommerce;
