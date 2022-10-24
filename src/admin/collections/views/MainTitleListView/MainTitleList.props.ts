/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { MainTitleListItemDTO } from 'admin/collections/types';
import { FieldSetProps } from 'admin/core';

export interface MainTitleListContextProps {
    /* states */
    mainTitleList: MainTitleListItemDTO[];
    isDropFilter: boolean;
    showDropFilter: () => void;
    hideDropFilter: () => void;
    isBreakPoint: boolean;
    /* functions */
    handleFilter: (event?: BaseSyntheticEvent) => Promise<void>;
    handleResetFilter: () => void;
    /* props */
    filterFormFields: FieldSetProps[];
}

export interface MainTitleListProviderProps extends ChildrenProps {
    context: MainTitleListContextProps;
}
