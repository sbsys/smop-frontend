export interface MenuTitleListItemDTO {
    titleId: number;
    title: string;
    items: string[];
    url: string;
}

export interface MenuMergeDTO {
    commerces: [];
    menu: MenuTitleListItemDTO[];
}
