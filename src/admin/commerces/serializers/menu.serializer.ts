import { MenuCommerceListItemDTO, MenuMergeDTO, MenuTitleListItemDTO, TitleProductListItemDTO } from '../types';

export const menuMergeProductListItemSerializer = (data: any): TitleProductListItemDTO => {
    return { ...data, price: Number.parseFloat(data.price ?? '0') };
};

export const menuMergeListItemSerializer = (data: any): MenuTitleListItemDTO => {
    return { ...data, products: data.products.map((item: any) => menuMergeProductListItemSerializer(item)) };
};

export const menuCommerceListItemSerializer = (data: any): MenuCommerceListItemDTO => {
    return { ...data };
};

export const menuMergeListSerializer = (data: any): MenuMergeDTO => {
    return {
        commerces: data.commerces.map((item: any) => menuCommerceListItemSerializer(item)),
        menu: data.sampleMenu.map((item: any) => menuMergeListItemSerializer(item)),
    };
};

export const menuSampleSerializer = (data: any): MenuTitleListItemDTO[] => {
    return data.menu.map((item: any) => menuMergeListItemSerializer(item));
};
