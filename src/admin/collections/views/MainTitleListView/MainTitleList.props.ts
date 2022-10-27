/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { MainTitleListItemDTO, TitleCollection } from 'admin/collections/types';
import { FieldSetProps } from 'admin/core';

export interface MainTitleListContextProps {
    /* states */
    mainTitleList: MainTitleListItemDTO[];
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
    titleCollection: TitleCollection[];
    multiLanguage: boolean;
}
