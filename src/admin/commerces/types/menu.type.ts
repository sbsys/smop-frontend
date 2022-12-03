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

export interface MenuMergeDTO {
    commerces: [];
    menu: MenuTitleListItemDTO[];
}
