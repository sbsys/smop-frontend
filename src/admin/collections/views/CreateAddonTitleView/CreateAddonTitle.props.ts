/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
import { AdminLang, FieldSetProps } from 'admin/core';
/* utils */
import * as yup from 'yup';
/* types */
import { ComplementTypeId, TitleCollectionForm } from 'admin/collections/types';

export interface CreateAddonTitleContextProps {
    /* functions */
    handleCreateAddonTitle: (event?: BaseSyntheticEvent) => Promise<void>;
    handleCalcelCreateAddonTitle: () => void;
    /* props */
    createAddonTitleFieldProps: FieldSetProps[];
}

export interface CreateAddonTitleProviderProps extends ChildrenProps {
    context: CreateAddonTitleContextProps;
}

export interface CreateAddonTitleFormData {
    defaultTitle: string;
    titleCollection: TitleCollectionForm[];
    multiLanguage: boolean;
    complementType: ComplementTypeId;
    maxAccuSubItem: number;
}

export const CreateAddonTitleSchema = yup
    .object({
        defaultTitle: yup.mixed().when(['multiLanguage'], {
            is: (multiLanguage: boolean) => !multiLanguage,
            then: yup.string().required('createaddontitle.collection.required'),
            otherwise: yup.string().optional(),
        }),
        titleCollection: yup.array().of(
            yup
                .object({
                    lang: yup.string().required('createaddontitle.collection.required'),
                    refs: yup.string().required('createaddontitle.collection.required'),
                })
                .required()
        ),
        multiLanguage: yup.boolean().required(),
        complementType: yup
            .number()
            .typeError('createaddontitle.type.required')
            .integer('createaddontitle.type.required'),
        maxAccuSubItem: yup.mixed().when('complementType', {
            is: (complementType: number) => complementType === 3,
            then: yup
                .number()
                .typeError('createaddontitle.maxaccusubitem.required' as AdminLang)
                .required('createaddontitle.maxaccusubitem.required' as AdminLang)
                .min(2, 'createaddontitle.maxaccusubitem.min' as AdminLang)
                .max(10, 'createaddontitle.maxaccusubitem.max' as AdminLang),
            otherwise: yup.number().optional(),
        }),
    })
    .required();
