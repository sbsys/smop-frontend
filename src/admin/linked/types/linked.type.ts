import { TitleState } from 'admin/collections';

export interface LinkedCommerceSettingsDTO {
    organizationId: string;
    commerceId: string;
    decimals: number;
}

export interface MenuLinkedListItemDTO {
    titleId: number;
    defaultTitle: string;
    numberMenuItems: number;
    numberGenericItems: number;
    isActive: TitleState;
}

export interface MenuNotLinkedListItemDTO {}

export interface LinkProduct {
    titleId: number;
    productId: string;
    price: number;
}

export interface MenuProduct {
    productId: string;
    defaultReference: string;
    url: string;
    price: number;
}

export interface LinkMenuProduct {
    linked: MenuProduct[];
    unlinked: MenuProduct[];
}
