/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
import { AdminLang, FieldSetProps } from 'admin/core';
/* utils */
import * as yup from 'yup';
/* types */
import { TitleCollectionForm } from 'admin/collections/types';

export interface CreateMainTitleContextProps {
    /* functions */
    handleCreateMainTitle: (event?: BaseSyntheticEvent) => Promise<void>;
    handleCalcelCreateMainTitle: () => void;
    /* props */
    createMainTitleFieldProps: FieldSetProps[];
}

export interface CreateMainTitleProviderProps extends ChildrenProps {
    context: CreateMainTitleContextProps;
}

export interface CreateMainTitleFormData {
    defaultTitle: string;
    titleCollection: TitleCollectionForm[];
    multiLanguage: boolean;
}

export const CreateMainTitleSchema = yup
    .object({
        defaultTitle: yup.mixed().when(['multiLanguage'], {
            is: (multiLanguage: boolean) => !multiLanguage,
            then: yup.string().required('createmaintitle.collection.required' as AdminLang),
            otherwise: yup.string().optional(),
        }),
        titleCollection: yup.array().of(
            yup
                .object({
                    lang: yup.string().required('createmaintitle.collection.required' as AdminLang),
                    refs: yup.string().required('createmaintitle.collection.required' as AdminLang),
                })
                .required()
        ),
        multiLanguage: yup.boolean().required(),
    })
    .required();
