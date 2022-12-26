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
