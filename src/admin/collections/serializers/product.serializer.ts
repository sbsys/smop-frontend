import { ProductListItemDTO } from '../types';

export const productListItemSerializer = (data: any): ProductListItemDTO => {
    return {
        ...data,
        isActive: data.isActive ? 'active' : 'inactive',
        createdAt: !data.createdAt ? null : new Date(data.createdAt),
        updatedAt: !data.updatedAt ? null : new Date(data.updatedAt),
    };
};

export const productListSerializer = (data: any): ProductListItemDTO[] => {
    return (data.products as any[]).map(item => productListItemSerializer(item));
};
