/* react */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
/* modules */
import { AuthReducer } from 'admin/auth';

export const adminStore = configureStore({
    reducer: {
        auth: AuthReducer,
    },
});

export type AdminStoreState = ReturnType<typeof adminStore.getState>;
export type AdminStoreDispatch = typeof adminStore.dispatch;

export const useAdminDispatch: () => AdminStoreDispatch = useDispatch;
export const useAdminSelector: TypedUseSelectorHook<AdminStoreState> = useSelector;
