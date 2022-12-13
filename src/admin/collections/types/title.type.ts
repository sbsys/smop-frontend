export interface TitleCollection {
    ref: string;
    lang: string;
}

export interface TitleCollectionForm {
    refs: string;
    lang: string;
}

export interface TitleRefCollection {
    titleId: number;
}

export type TitleState = 'active' | 'inactive';

export interface TitleListItemDTO {
    titleId: number;
    titleCollection: TitleCollection[];
    defaultTitle: string;
    multiLanguage: boolean;
    totalProducts: number;
    isActive: TitleState;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export interface MainTitleListItemDTO extends TitleListItemDTO {
    serviceMode: number;
    servedOn: string;
    url: string;
}

export type ComplementType = 'single' | 'multiple' | 'combo';
export type ComplementTypeId = 1 | 2 | 3;

export const ComplementTypeToIdMap: Record<ComplementType, ComplementTypeId> = {
    single: 1,
    multiple: 2,
    combo: 3,
};

export const ComplementIdToTypeMap: Record<ComplementTypeId, ComplementType> = {
    1: 'single',
    2: 'multiple',
    3: 'combo',
};

export interface ComplementTitleListItemDTO extends Omit<TitleListItemDTO, 'createdAt' | 'updatedAt'> {
    type: ComplementType;
}
