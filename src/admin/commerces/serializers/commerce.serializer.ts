import { CommerceListItemDTO } from '../types';

export const commerceListItemSerializer = (data: any): CommerceListItemDTO => {
    return {
        id: data.commerceId,
        name: data.referenceName,
        isActive: data.isActive ? 'active' : 'inactive',
        createdAt: new Date(data.createdAt),
    };
};
