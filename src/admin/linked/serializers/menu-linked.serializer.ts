import { MenuLinkedListItemDTO } from '../types';

export const menuLinkedListItemSerializer = (data: any): MenuLinkedListItemDTO => {
    return {
        ...data,
        numberMenuItems: Number.parseInt(`${data.availableItems ?? 0}`),
        numberGenericItems: Number.parseInt(`${data.totalItems ?? 0}`),
        isActive: data.isActive ? 'active' : 'inactive',
    };
};

export const menuLinkedListSerializer = (data: any): MenuLinkedListItemDTO[] => {
    return data.titles.map((item: any) => menuLinkedListItemSerializer(item));
};
