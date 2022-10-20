import { CommerceDetailDTO, CommerceListItemDTO } from '../types';

export const commerceListItemSerializer = (data: any): CommerceListItemDTO => {
    return {
        id: data.commerceId,
        name: data.referenceName,
        isActive: data.isActive ? 'active' : 'inactive',
        createdAt: new Date(data.createdAt),
    };
};

export const commerceDetailSerializer = (data: any): CommerceDetailDTO => {
    return {
        ...data.commerce,
        optionalAddress: data.commerce.optionalAddress !== '-' ? data.commerce.optionalAddress : '',
        createdAt: new Date(data.commerce.createdAt),
    } as CommerceDetailDTO;
};
