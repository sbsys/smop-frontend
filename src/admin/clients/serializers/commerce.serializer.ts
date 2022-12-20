import { CommerceDetail } from '../types';

export const commerceDetailSerializer = (data: any): CommerceDetail => {
    const commerce = data.commerce;
    console.log(commerce);

    return {};
};
