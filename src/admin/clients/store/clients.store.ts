/* react */
import { createSlice /* , PayloadAction */, PayloadAction } from '@reduxjs/toolkit';
/* types */
import { AdminStoreState } from 'admin/core';
import { OrganizationDetail } from '../types';

interface ClientsState {
    organization: OrganizationDetail;
}

const initialState: ClientsState = {
    organization: {} as OrganizationDetail,
};

const ClientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        clientsStoreSetOrganization: (state, { payload }: PayloadAction<OrganizationDetail>) => {
            state.organization = payload;
        },
    },
});

export const ClientsReducer = ClientsSlice.reducer;

export const { clientsStoreSetOrganization } = ClientsSlice.actions;

export const selectClientsStore = (state: AdminStoreState) => state.clients;

export const selectOrganization = (state: AdminStoreState) => state.clients.organization;
