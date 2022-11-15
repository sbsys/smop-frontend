import { MenuNotLinkedListItemDTO } from '../types';

export const menuNotLinkedListItemSerializer = (data: any): MenuNotLinkedListItemDTO => {
    return {
        ...data,
    };
};

export const menuNotLinkedListSerializer = (data: any): MenuNotLinkedListItemDTO[] => {
    return data.titles.map((item: any) => menuNotLinkedListItemSerializer(item));
};
