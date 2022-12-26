/* react */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* types */
import { AdminStoreState } from 'admin/core';
import { CommerceDetail, OrganizationDetail, TitleProductListItem } from '../types';

interface Menu {
    [index: number]: TitleProductListItem[];
}

interface ClientsState {
    organization: OrganizationDetail | null;
    currentCommerce: CommerceDetail | null;
    menu: Menu;
}

const initialState: ClientsState = {
    organization: null,
    currentCommerce: null,
    menu: {},
};

const ClientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        clientsStoreSetOrganization: (state, { payload }: PayloadAction<OrganizationDetail | null>) => {
            state.organization = payload;
        },
        clientsStoreSetCurrentCommerce: (state, { payload }: PayloadAction<CommerceDetail>) => {
            state.currentCommerce = payload;
        },
        clientsStoreSetMenuTitleProductList: (
            state,
            {
                payload: { titleId, productList },
            }: PayloadAction<{ titleId: number; productList: TitleProductListItem[] }>
        ) => {
            state.menu[titleId] = productList;
        },
        clientsStoreCleanUpSelectedCommerce: state => {
            state.currentCommerce = null;
            state.menu = {};
        },
    },
});

export const ClientsReducer = ClientsSlice.reducer;

export const {
    clientsStoreSetOrganization,
    clientsStoreSetCurrentCommerce,
    clientsStoreSetMenuTitleProductList,
    clientsStoreCleanUpSelectedCommerce,
} = ClientsSlice.actions;

export const selectClientsStore = (state: AdminStoreState) => state.clients;

export const selectOrganization = (state: AdminStoreState) => state.clients.organization;

export const selectCurrentCommerce = (state: AdminStoreState) => state.clients.currentCommerce;

export const selectCurrentTitle = (titleId: number) => (state: AdminStoreState) => ({
    menuTitle: state.clients.currentCommerce?.menu?.find(menu => menu.titleId === titleId) ?? null,
    productList: state.clients.menu[titleId] ?? [],
});
