import { MainTitleListItemDTO, TitleListItemDTO } from '../types';

export const titleListItemSerializer = (data: any): TitleListItemDTO => {
    return {
        ...data,
        isActive: data.isActive ? 'active' : 'inactive',
        createdAt: new Date(data.createdAt),
    };
};

export const mainTitleListItemSerializer = (data: any): MainTitleListItemDTO => {
    return {
        ...titleListItemSerializer(data),
        ...data,
    };
};
