/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
import { FieldSetProps } from 'admin/core';
/* types */
import { CommerceListItemDTO } from 'admin/commerces/types';

export interface CommerceListContextProps {
    /* states */
    commerceList: CommerceListItemDTO[];
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

export interface CommerceListProviderProps extends ChildrenProps {
    context: CommerceListContextProps;
}
