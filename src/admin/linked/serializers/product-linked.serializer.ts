import { LinkMenuProduct, MenuProduct } from '../types';

export const productLinkedListItemSerializer = (data: any): MenuProduct => {
    return {
        ...data,
        price: Number.parseFloat(data.price ?? '0'),
    };
};

export const productLinkedListSerializer = (data: any): LinkMenuProduct => {
    return {
        linked: data.linked.map((item: any) => productLinkedListItemSerializer(item)),
        unlinked: data.unlinked.map((item: any) => productLinkedListItemSerializer(item)),
    };
};
