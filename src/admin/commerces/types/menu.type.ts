export interface TitleProductListItemDTO {
    productId: string;
    defaultReference: string;
    price: number;
}

export interface MenuTitleListItemDTO {
    titleId: number;
    title: string;
    url: string;
    products: TitleProductListItemDTO[];
}

export interface MenuCommerceListItemDTO {
    commerceId: string;
    referenceName: string;
}

export interface MenuMergeDTO {
    commerces: MenuCommerceListItemDTO[];
    menu: MenuTitleListItemDTO[];
}
