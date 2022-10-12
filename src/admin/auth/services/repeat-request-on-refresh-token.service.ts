/* store */
import { adminStore } from 'admin/core';
import { authStoreSignOut, authUpdateToken } from '../store';
/* services */
import { refreshTokenService } from './refresh-token.service';
/* utils */
import { triggerCustomEvent } from 'shared/utils';

export const repeatRequestOnRefreshTokenService = async <T>(sideEffect: () => Promise<T>) => {
    const response = await refreshTokenService();
console.log("RefreshToken", response);
    if (response.error) {
        adminStore.dispatch(authStoreSignOut());

        triggerCustomEvent('logout_notify');

        return response;
    }

    adminStore.dispatch(authUpdateToken(response.data.token));

    return await sideEffect();
};
