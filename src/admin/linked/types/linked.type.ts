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
    url: string;
}

export interface MenuNotLinkedListItemDTO {
    titleId: number;
    defaultTitle: string;
}

export interface LinkProduct {
    productId: string;
    price: number;
    isAvailable: boolean;
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

export interface LinkedMenuProduct extends MenuProduct {
    isAvailable: boolean;
}
