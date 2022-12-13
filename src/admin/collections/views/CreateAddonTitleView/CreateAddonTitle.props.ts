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
}

export const CreateAddonTitleSchema = yup
    .object({
        defaultTitle: yup.mixed().when(['multiLanguage'], {
            is: (multiLanguage: boolean) => !multiLanguage,
            then: yup.string().required('createaddontitle.collection.required' as AdminLang),
            otherwise: yup.string().optional(),
        }),
        titleCollection: yup.array().of(
            yup
                .object({
                    lang: yup.string().required('createaddontitle.collection.required' as AdminLang),
                    refs: yup.string().required('createaddontitle.collection.required' as AdminLang),
                })
                .required()
        ),
        multiLanguage: yup.boolean().required(),
        complementType: yup
            .number()
            .typeError('createaddontitle.type.required')
            .integer('createaddontitle.type.required'),
    })
    .required();
