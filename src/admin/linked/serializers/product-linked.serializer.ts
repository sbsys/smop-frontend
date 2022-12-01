import { LinkedMenuProduct } from '../types';

export const productLinkedListItemSerializer = (data: any): LinkedMenuProduct => {
    return {
        ...data,
        price: Number.parseFloat(data.price ?? '0'),
    };
};

export const productLinkedListSerializer = (data: any): LinkedMenuProduct[] => {
    console.log(data);
    return data.products.map((item: any) => productLinkedListItemSerializer(item));
};
