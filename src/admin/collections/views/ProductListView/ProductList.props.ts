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
    selectedProductToUpdateState: ProductListItemDTO | null;
    isDropFilter: boolean;
    getProductList: () => Promise<void>;
    showDropFilter: () => void;
    hideDropFilter: () => void;
    isBreakPoint: boolean;
    /* functions */
    handleFilter: (event?: BaseSyntheticEvent) => Promise<void>;
    handleResetFilter: () => void;
    handleSelectProductToUpdateState: (id: string) => void;
    handleUnselectProductToUpdateState: () => void;
    /* props */
    filterFormFields: FieldSetProps[];
}

export interface ProductListProviderProps extends ChildrenProps {
    context: ProductListContextProps;
}
