import { ProductDetailDTO, ProductListItemDTO, TitleProductListItemDTO } from '../types';

export const productListItemSerializer = (data: any): ProductListItemDTO => {
    return {
        ...data,
        isActive: data.isActive ? 'active' : 'inactive',
        createdAt: !data.createdAt ? null : new Date(data.createdAt),
        updatedAt: !data.updatedAt ? null : new Date(data.updatedAt),
    };
};

export const productListSerializer = (data: any): ProductListItemDTO[] => {
    return (data.products as any[]).map(item => productListItemSerializer(item));
};

export const productDetailSerializer = (data: any): ProductDetailDTO => {
    const product = data.product[0];

    return {
        productId: product.productId,
        /* references */
        defaultReference: product.defaultReference,
        defaultDescription: product.defaultDescription,
        multiLanguage: product.multiLanguage,
        referenceCollection: product.referenceCollection,
        descriptionCollection: product.descriptionCollection,
        allowPrompts: product.allowPrompts,
        /* file */
        url: product.url,
        /* collections */
        mainCollection: product.menu?.map((main: any) => ({ titleId: main.titleId })) ?? [],
        maxAccuItems: product.maxAccuItems,
        markAsAddon: product.markAsAddon,
        accesoryCollection: product.complements?.map((accesory: any) => ({ titleId: accesory.titleId })) ?? [],
        multipleChoice: product.multiples?.map((multiple: any) => ({ titleId: multiple.titleId })) ?? [],
        singleChoice: product.singles?.map((single: any) => ({ titleId: single.titleId })) ?? [],
        isCombo: product.isCombo,
        comboChoice: product.combos?.map((combo: any) => ({ titleId: combo.titleId })) ?? [],
        /* others */
        feature: product.feature[0],
        createdAt: new Date(product.createdAt),
        isActive: product.isActive ? 'active' : 'inactive',
        isAvailable: product.isAvailable,
        price: product.price,
    };
};

export const titleProductListItemSerializer = (data: any): TitleProductListItemDTO => {
    return {
        ...data,
        isActive: data.isActive ? 'active' : 'inactive',
    };
};

export const titleProductListSerializer = (data: any): TitleProductListItemDTO[] => {
    return (data.items as any[]).map(item => titleProductListItemSerializer(item));
};

export const mainTitleProductListItemSerializer = (data: any): TitleProductListItemDTO => {
    return {
        ...data.product,
        isActive: data.product.isActive ? 'active' : 'inactive',
    };
};

export const mainTitleProductListSerializer = (data: any): TitleProductListItemDTO[] => {
    return (data.items as any[]).map(item => mainTitleProductListItemSerializer(item));
};
