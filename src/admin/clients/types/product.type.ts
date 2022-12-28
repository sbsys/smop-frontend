import { LangCollection } from './commerce.type';

export interface TitleProductListItem {
    productId: string;
    defaultReference: string;
    referenceCollection: LangCollection[];
    defaultDescription: string;
    descriptionCollection: LangCollection[];
    multiLanguage: boolean;
    maxAccuItems: number;
    allowPrompts: boolean;
    price: number;
    url: string;
}

export interface ProductComplementListItem {
    productId: string;
    defaultReference: string;
    referenceCollection: LangCollection[];
    multiLanguage: boolean;
}

export interface ProductTitleListItem {
    titleId: number;
    defaultTitle: string;
    titleCollection: LangCollection[];
    maxAccuSubItem: number;
    multiLanguage: boolean;
    complements: ProductComplementListItem[];
}

export interface ProductConfig {
    multiples: ProductTitleListItem[];
    singles: ProductTitleListItem[];
    combos: ProductTitleListItem[];
}
