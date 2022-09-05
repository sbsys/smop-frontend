/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
import { FieldSetProps } from 'admin/core';
/* types */
import { TenantItemDTO } from 'admin/tenants/types';

export interface TenantListContextProps {
    /* states */
    isDropFilter: boolean;
    showDropFilter: () => void;
    hideDropFilter: () => void;
    isBreakPoint: boolean;
    tenantList: TenantItemDTO[];
    /* functions */
    handleFilter: (event?: BaseSyntheticEvent) => Promise<void>;
    handleResetFilter: () => void;
    /* props */
    textSearchProps: FieldSetProps;
    startDateSearchProps: FieldSetProps;
    endDateSearchProps: FieldSetProps;
    stateSearchProps: FieldSetProps;
}

export type TitleSubtitle = {
    title: string;
    subtitle: string;
};

export interface TenantListProviderProps extends ChildrenProps {
    context: TenantListContextProps;
}
