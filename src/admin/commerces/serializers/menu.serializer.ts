import { MenuMergeDTO, MenuTitleListItemDTO, TitleProductListItemDTO } from '../types';

export const menuMergeProductListItemSerializer = (data: any): TitleProductListItemDTO => {
    return { ...data, price: Number.parseFloat(data.price ?? '0') };
};

export const menuMergeListItemSerializer = (data: any): MenuTitleListItemDTO => {
    return { ...data, products: data.products.map((item: any) => menuMergeProductListItemSerializer(item)) };
};

export const menuMergeListSerializer = (data: any): MenuMergeDTO => {
    return {
        commerces: [],
        menu: data.sampleMenu.map((item: any) => menuMergeListItemSerializer(item)),
    };
};