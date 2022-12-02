import { MenuMergeDTO, MenuTitleListItemDTO } from '../types';

export const menuMergeListItemSerializer = (data: any): MenuTitleListItemDTO => {
    return { ...data };
};

export const menuMergeListSerializer = (data: any): MenuMergeDTO => {
    console.log(data);
    return {
        commerces: [],
        menu: data.sampleMenu.map((item: any) => menuMergeListItemSerializer(item)),
    };
};
