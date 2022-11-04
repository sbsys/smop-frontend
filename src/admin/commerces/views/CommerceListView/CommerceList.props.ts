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
    selectedCommerceToUpdateState: CommerceListItemDTO | null;
    isDropFilter: boolean;
    showDropFilter: () => void;
    hideDropFilter: () => void;
    isBreakPoint: boolean;
    /* functions */
    getCommerceList: () => Promise<void>;
    handleFilter: (event?: BaseSyntheticEvent) => Promise<void>;
    handleResetFilter: () => void;
    handleSelectCommerceToUpdateState: (id: string) => void;
    handleUnselectCommerceToUpdateState: () => void;
    /* props */
    filterFormFields: FieldSetProps[];
}

export interface CommerceListProviderProps extends ChildrenProps {
    context: CommerceListContextProps;
}
