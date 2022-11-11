/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
import { FieldSetProps } from 'admin/core';
/* types */
import { MenuLinkedListItemDTO } from 'admin/linked/types';

export interface CommerceMenuContextProps {
    /* states */
    linkedTitleList: MenuLinkedListItemDTO[];
    isDropFilter: boolean;
    showDropFilter: () => void;
    hideDropFilter: () => void;
    isBreakPoint: boolean;
    /* functions */
    getMenuLinkedList: () => Promise<void>;
    handleFilter: (event?: BaseSyntheticEvent) => Promise<void>;
    handleResetFilter: () => void;
    /* props */
    filterFormFields: FieldSetProps[];
}

export interface CommerceMenuProviderProps extends ChildrenProps {
    context: CommerceMenuContextProps;
}
