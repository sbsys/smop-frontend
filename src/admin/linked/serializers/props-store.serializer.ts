import { LinkedCommerceSettings } from '../types';

export const propsStoreSerializer = (data: any): LinkedCommerceSettings => {
    return { ...data };
};
