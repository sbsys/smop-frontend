/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
import { FieldSetProps } from 'admin/core';
/* types */
import { ProductListItemDTO } from 'admin/collections/types';

export interface ProductListContextProps {
    /* states */
    productList: ProductListItemDTO[];
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

export interface ProductListProviderProps extends ChildrenProps {
    context: ProductListContextProps;
}
