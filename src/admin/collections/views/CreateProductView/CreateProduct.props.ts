/* react */
import { BaseSyntheticEvent, MutableRefObject } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
import { TabsLayoutRef } from 'shared/layouts';
/* utils */
import * as yup from 'yup';
/* types */
import { AdminLang } from 'admin/core';
import {
    MainTitleListItemDTO,
    TitleCollectionForm,
    TitleListItemDTO,
    TitleRefCollection,
} from 'admin/collections/types';

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
    referenceCollection: TitleCollectionForm[];
    descriptionCollection: TitleCollectionForm[];
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

export const CreateProductSchema = yup.object({
    /* references */
    defaultReference: yup.mixed().when(['multiLanguage'], {
        is: (multiLanguage: boolean) => !multiLanguage,
        then: yup.string().required('createproduct.references.required' as AdminLang),
        otherwise: yup.string().optional(),
    }),
    defaultDescription: yup.mixed().when(['multiLanguage'], {
        is: (multiLanguage: boolean) => !multiLanguage,
        then: yup.string().required('createproduct.description.required' as AdminLang),
        otherwise: yup.string().optional(),
    }),
    multiLanguage: yup.boolean().required(),
    referenceCollection: yup.array().of(
        yup
            .object({
                lang: yup.string().required('createproduct.references.required' as AdminLang),
                refs: yup.string().required('createproduct.references.required' as AdminLang),
            })
            .required()
    ),
    descriptionCollection: yup.array().of(
        yup
            .object({
                lang: yup.string().required('createproduct.description.required' as AdminLang),
                refs: yup.string().required('createproduct.description.required' as AdminLang),
            })
            .required()
    ),
    allowPrompts: yup.boolean().required(),
    /* file */
    includePicture: yup.boolean().required(),
    image: yup.mixed().when(['includePicture'], {
        is: (includePicture: boolean) => includePicture,
        then: yup
            .mixed()
            .test('required', 'createproduct.image.required' as AdminLang, value => value && value.length > 0)
            .test(
                'fileSize',
                'createproduct.image.size' as AdminLang,
                value => value && value[0] && value[0].size <= 10000000
            )
            .test(
                'type',
                'createproduct.image.type' as AdminLang,
                value => value && value[0] && (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
            ),
        otherwise: yup.mixed().optional(),
    }),
    /* collections */
    mainCollection: yup.array().of(
        yup.object({
            titleId: yup.number().required(),
        })
    ),
    markAsAddon: yup.boolean().required(),
    accesoryCollection: yup.mixed().when(['markAsAddon'], {
        is: (markAsAddon: boolean) => markAsAddon,
        then: yup
            .array()
            .of(
                yup.object({
                    titleId: yup
                        .number()
                        .typeError('createproduct.addon.required' as AdminLang)
                        .required('createproduct.addon.required' as AdminLang),
                })
            )
            .required('createproduct.addon.required' as AdminLang)
            .min(1, 'createproduct.addon.required' as AdminLang),
        otherwise: yup.array().of(
            yup.object({
                titleId: yup
                    .number()
                    .typeError('createproduct.addon.required' as AdminLang)
                    .required('createproduct.addon.required' as AdminLang),
            })
        ),
    }),
    multipleChoice: yup.array().of(
        yup.object({
            titleId: yup.number().required(),
        })
    ),
    singleChoice: yup.array().of(
        yup.object({
            titleId: yup.number().required(),
        })
    ),
});
