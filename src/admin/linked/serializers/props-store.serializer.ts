import { LinkedCommerceSettingsDTO } from '../types';

export const propsStoreSerializer = (data: any): LinkedCommerceSettingsDTO => {
    return { ...data };
};
