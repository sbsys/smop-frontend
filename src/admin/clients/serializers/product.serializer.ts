import { ProductConfig, ProductTitleListItem, TitleProductListItem } from '../types';

export const titleProductListSerializer = (data: any): TitleProductListItem[] => {
    const products = data.products;

    return products.map((product: any) => ({ ...product, price: product.price }));
};

const productConfigSerializer = (data: any): ProductTitleListItem => {
    return {
        ...data,
        complements:
            data.complements?.map((complement: any) => ({
                productId: complement.productId,
                ...complement.product,
            })) ?? [],
    };
};

export const titleProductConfigSerializer = (data: any): ProductConfig => {
    return {
        multiples: data.multiples?.map((item: any) => productConfigSerializer(item)) ?? [],
        singles: data.singles?.map((item: any) => productConfigSerializer(item)) ?? [],
        combos: data.combos?.map((item: any) => productConfigSerializer(item)) ?? [],
    };
};
