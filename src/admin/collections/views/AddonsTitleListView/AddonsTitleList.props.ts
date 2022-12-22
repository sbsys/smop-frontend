/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
/* utils */
import * as yup from 'yup';
/* types */
import { TitleCollectionForm, ComplementTitleListItemDTO, ComplementTypeId } from 'admin/collections/types';
import { AdminLang, FieldSetProps } from 'admin/core';

export interface AddonsTitleListContextProps {
    /* states */
    addonsTitleList: ComplementTitleListItemDTO[];
    selectedTitle: ComplementTitleListItemDTO | null;
    selectedTitleToUpdate: ComplementTitleListItemDTO | null;
    selectedTitleToUpdateState: ComplementTitleListItemDTO | null;
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

export interface AddonsTitleListProviderProps extends ChildrenProps {
    context: AddonsTitleListContextProps;
}

export interface UpdateAddonTitleFormData {
    defaultTitle: string;
    titleCollection: TitleCollectionForm[];
    multiLanguage: boolean;
    complementType: ComplementTypeId;
    maxAccuSubItem: number;
}

export const UpdateAddonTitleSchema = yup
    .object({
        defaultTitle: yup.mixed().when(['multiLanguage'], {
            is: (multiLanguage: boolean) => !multiLanguage,
            then: yup.string().required('addontitleedit.collection.required' as AdminLang),
            otherwise: yup.string().optional(),
        }),
        titleCollection: yup.array().of(
            yup
                .object({
                    lang: yup.string().required('addontitleedit.collection.required' as AdminLang),
                    refs: yup.string().required('addontitleedit.collection.required' as AdminLang),
                })
                .required()
        ),
        multiLanguage: yup.boolean().required(),
        complementType: yup.number().typeError('addontitleedit.type.required').integer('addontitleedit.type.required'),
        maxAccuSubItem: yup.mixed().when('complementType', {
            is: (complementType: number) => complementType === 3,
            then: yup
                .number()
                .typeError('addontitleedit.maxaccusubitem.required' as AdminLang)
                .required('addontitleedit.maxaccusubitem.required' as AdminLang)
                .min(2, 'addontitleedit.maxaccusubitem.min' as AdminLang)
                .max(10, 'addontitleedit.maxaccusubitem.max' as AdminLang),
            otherwise: yup.number().optional(),
        }),
    })
    .required();
