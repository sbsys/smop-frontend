/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
import { FieldSetProps } from 'admin/core';
/* types */
import { GatewayListItem } from 'admin/tenants/types';

export interface TenantApiManagementContextProps {
    /* states */
    keyList: GatewayListItem[];
    isDropFilter: boolean;
    showDropFilter: () => void;
    hideDropFilter: () => void;
    isBreakPoint: boolean;
    /* functions */
    handleFilter: (event: BaseSyntheticEvent) => Promise<void>;
    handleResetFilter: () => void;
    getKeyList: () => Promise<void>;
    /* props */
    filterFormFields: FieldSetProps[];
}

export interface TenantApiManagementProviderProps extends ChildrenProps {
    context: TenantApiManagementContextProps;
}
