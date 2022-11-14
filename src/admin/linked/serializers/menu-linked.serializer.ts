import { MenuLinkedListItemDTO } from '../types';

export const menuLinkedListItemSerializer = (data: any): MenuLinkedListItemDTO => {
    return {
        ...data,
        numberMenuItems: Number.parseInt(`${data.numberMenuItems ?? 0}`),
        numberGenericItems: Number.parseInt(`${data.numberGenericItems ?? 0}`),
        isActive: data.isActive ? 'active' : 'inactive',
    };
};

export const menuLinkedListSerializer = (data: any): MenuLinkedListItemDTO[] => {
    return data.titles.map((item: any) => menuLinkedListItemSerializer(item));
};
