/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
/* utils */
import * as yup from 'yup';
/* types */
import { MainTitleListItemDTO, TitleCollectionForm } from 'admin/collections/types';
import { AdminLang, FieldSetProps } from 'admin/core';

export interface MainTitleListContextProps {
    /* states */
    mainTitleList: MainTitleListItemDTO[];
    selectedTitle: MainTitleListItemDTO | null;
    selectedTitleToUpdate: MainTitleListItemDTO | null;
    selectedTitleToUpdateState: MainTitleListItemDTO | null;
    isDropFilter: boolean;
    showDropFilter: () => void;
    hideDropFilter: () => void;
    isBreakPoint: boolean;
    /* functions */
    handleFilter: (event?: BaseSyntheticEvent) => Promise<void>;
    handleResetFilter: () => void;
    getTitleList: () => Promise<void>;
    handleSelectTitle: (id: number) => void;
    handleUnselectTitle: () => void;
    handleSelectTitleToUpdate: (id: number) => void;
    handleUnselectTitleToUpdate: () => void;
    handleSelectTitleToUpdateState: (id: number) => void;
    handleUnselectTitleToUpdateState: () => void;
    /* props */
    filterFormFields: FieldSetProps[];
}

export interface MainTitleListProviderProps extends ChildrenProps {
    context: MainTitleListContextProps;
}

export interface UpdateMainTitleFormData {
    defaultTitle: string;
    titleCollection: TitleCollectionForm[];
    multiLanguage: boolean;
    image: FileList;
}

export const UpdateMainTitleSchema = yup
    .object({
        defaultTitle: yup.mixed().when(['multiLanguage'], {
            is: (multiLanguage: boolean) => !multiLanguage,
            then: yup.string().required('maintitleedit.collection.required' as AdminLang),
            otherwise: yup.string().optional(),
        }),
        titleCollection: yup.array().of(
            yup
                .object({
                    lang: yup.string().required('maintitleedit.collection.required' as AdminLang),
                    refs: yup.string().required('maintitleedit.collection.required' as AdminLang),
                })
                .required()
        ),
        multiLanguage: yup.boolean().required(),
        image: yup
            .mixed()
            .optional()
            /* .test('required', 'maintitleedit.image.required' as AdminLang, value => value && value.length > 0) */
            .test(
                'fileSize',
                'maintitleedit.image.size' as AdminLang,
                (value: any) => (value && value[0] && value[0].size <= 10000000) || value === undefined
            )
            .test(
                'type',
                'maintitleedit.image.type' as AdminLang,
                (value: any) =>
                    (value && value[0] && (value[0].type === 'image/jpeg' || value[0].type === 'image/png')) ||
                    value === undefined
            ),
    })
    .required();
