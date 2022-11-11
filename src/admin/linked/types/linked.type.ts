import { TitleState } from 'admin/collections';

export interface LinkedCommerceSettingsDTO {
    organizationId: string;
    commerceId: string;
    decimals: 4;
}

export interface MenuLinkedListItemDTO {
    titleId: number;
    defaultTitle: string;
    numberMenuItems: number;
    numberGenericItems: number;
    isActive: TitleState;
}

export interface MenuNotLinkedListItemDTO {}
