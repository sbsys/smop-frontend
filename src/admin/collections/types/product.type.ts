import { TitleCollection, TitleRefCollection } from './title.type';

export type ProductState = 'active' | 'inactive';

export interface ProductListItemDTO {
    productId: string;
    defaultReference: string;
    markAsAddon: boolean;
    isCombo: boolean;
    maxAccuItems: number;
    isActive: ProductState;
    createdAt: Date;
    url: string;
    price: string;
}

export interface TitleProductListItemDTO {
    productId: string;
    defaultReference: string;
    markAsAddon: boolean;
    isActive: ProductState;
}

export interface Measure {
    measureId: number;
    measure: string;
    unit: string;
}

export interface Presentation {
    presentationId: number;
    defaultDescription: string;
}

export interface ProductFeature {
    measure: Measure;
    presentation: Presentation;
}

export interface ProductDetailDTO {
    productId: string;
    /* references */
    defaultReference: string;
    defaultDescription: string;
    multiLanguage: boolean;
    referenceCollection: TitleCollection[];
    descriptionCollection: TitleCollection[];
    allowPrompts: boolean;
    /* file */
    /* includePicture: boolean;
    image: FileList; */
    url: string;
    /* collections */
    mainCollection: TitleRefCollection[];
    markAsAddon: boolean;
    accesoryCollection: TitleRefCollection[];
    multipleChoice: TitleRefCollection[];
    singleChoice: TitleRefCollection[];
    /* others */
    feature: ProductFeature;
    createdAt: Date;
    isActive: ProductState;
    isAvailable: boolean;
    price: string;
}
