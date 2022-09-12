/* store */
import { adminStore } from 'admin/core';

export const getCurrentUserId = () => adminStore.getState().auth.user.id;
