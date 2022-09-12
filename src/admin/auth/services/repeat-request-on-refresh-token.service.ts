import { adminStore } from 'admin/core';
import { authStoreSignOut, authUpdateToken } from '../store';
import { refreshTokenService } from './refresh-token.service';

export const repeatRequestOnRefreshTokenService = async <T>(sideEffect: () => Promise<T>) => {
    const response = await refreshTokenService();

    if (response.error) {
        adminStore.dispatch(authStoreSignOut());

        return response;
    }

    adminStore.dispatch(authUpdateToken(response.data.token));

    return await sideEffect();
};
