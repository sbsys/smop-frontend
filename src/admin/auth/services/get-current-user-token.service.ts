/* store */
import { adminStore } from 'admin/core';

export const getCurrentUserToken = () => adminStore.getState().auth.token;
