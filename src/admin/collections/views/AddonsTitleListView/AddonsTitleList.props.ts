/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { TitleCollection, TitleListItemDTO } from 'admin/collections/types';
import { FieldSetProps } from 'admin/core';

export interface AddonsTitleListContextProps {
    /* states */
    addonsTitleList: TitleListItemDTO[];
    selectedTitleToUpdate: TitleListItemDTO | null;
    selectedTitleToUpdateState: TitleListItemDTO | null;
    isDropFilter: boolean;
    showDropFilter: () => void;
    hideDropFilter: () => void;
    isBreakPoint: boolean;
    /* functions */
    handleFilter: (event?: BaseSyntheticEvent) => Promise<void>;
    handleResetFilter: () => void;
    getTitleList: () => Promise<void>;
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
    titleCollection: TitleCollection[];
    multiLanguage: boolean;
}
