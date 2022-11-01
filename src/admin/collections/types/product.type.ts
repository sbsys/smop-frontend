export type ProductState = 'active' | 'inactive';

export interface ProductListItemDTO {
    productId: string;
    defaultReference: string;
    markAsAddon: boolean;
    isActive: ProductState;
    createdAt: Date;
    url: string;
}

export interface ProductDetailDTO {}
