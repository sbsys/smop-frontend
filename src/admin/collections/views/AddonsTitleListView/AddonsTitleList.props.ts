/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { TitleListItemDTO } from 'admin/collections/types';
import { FieldSetProps } from 'admin/core';

export interface AddonsTitleListContextProps {
    /* states */
    addonsTitleList: TitleListItemDTO[];
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

export interface AddonsTitleListProviderProps extends ChildrenProps {
    context: AddonsTitleListContextProps;
}
