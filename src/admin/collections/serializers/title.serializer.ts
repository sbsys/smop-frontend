import { MainTitleListItemDTO, TitleListItemDTO } from '../types';

export const titleListItemSerializer = (data: any): TitleListItemDTO => {
    return {
        ...data,
        isActive: data.isActive ? 'active' : 'inactive',
        createdAt: !data.createdAt ? null : new Date(data.createdAt),
        updatedAt: !data.updatedAt ? null : new Date(data.updatedAt),
    };
};

export const mainTitleListItemSerializer = (data: any): MainTitleListItemDTO => {
    return {
        ...data,
        ...titleListItemSerializer(data),
    };
};
