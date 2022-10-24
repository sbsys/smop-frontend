export interface TitleCollection {
    ref: string;
    lang: string;
}

export type TitleState = 'active' | 'inactive';

export interface TitleListItemDTO {
    titleId: number;
    titleCollection: TitleCollection[];
    defaultTitle: string;
    multiLanguage: boolean;
    isActive: TitleState;
    createdAt: Date;
    updatedAt: Date;
}

export interface MainTitleListItemDTO extends TitleListItemDTO {
    serviceMode: number;
    servedOn: string;
}
