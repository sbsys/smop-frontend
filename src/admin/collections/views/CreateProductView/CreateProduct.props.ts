/* react */
import { BaseSyntheticEvent, MutableRefObject } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
import { TabsLayoutRef } from 'shared/layouts';
/* utils */
import * as yup from 'yup';
/* types */
import { MainTitleListItemDTO, TitleCollection, TitleListItemDTO, TitleRefCollection } from 'admin/collections/types';

export interface CreateProductContextProps {
    /* states */
    mainTitleList: MainTitleListItemDTO[];
    addonTitleList: TitleListItemDTO[];
    tabRef: MutableRefObject<TabsLayoutRef | null>;
    /* functions */
    handleCreateProductSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
    handleCancelCreateProduct: () => void;
    handleNextTab: () => void;
    handlePrevTab: () => void;
}

export interface CreateProductProviderProps extends ChildrenProps {
    context: CreateProductContextProps;
}

export interface CreateProductFormData {
    /* references */
    defaultReference: string;
    defaultDescription: string;
    multiLanguage: boolean;
    referenceCollection: TitleCollection[];
    descriptionCollection: TitleCollection[];
    allowPrompts: boolean;
    /* file */
    includePicture: boolean;
    image: FileList;
    /* collections */
    mainCollection: TitleRefCollection[];
    markAsAddon: boolean;
    accesoryCollection: TitleRefCollection[];
    multipleChoice: TitleRefCollection[];
    singleChoice: TitleRefCollection[];
}

export const CreateProductSchema = yup.object({});
