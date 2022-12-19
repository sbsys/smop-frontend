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
    const commerce = data.commerce;

    return {
        ...commerce,
        serviceHours: {
            onsite: commerce.serviceHours.onsite ?? [],
            delivery: commerce.serviceHours.delivery ?? [],
            curbside: commerce.serviceHours.curbside ?? [],
            pickup: commerce.serviceHours.pickup ?? [],
        },
        optionalAddress: commerce.optionalAddress !== '-' ? commerce.optionalAddress : '',
        createdAt: new Date(commerce.createdAt),
    } as CommerceDetailDTO;
};
