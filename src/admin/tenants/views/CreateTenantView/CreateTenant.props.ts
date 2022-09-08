/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
import { FieldSetProps } from 'admin/core';

export interface CreateTenantContextProps {
    /* functions */
    handleCreateTenant: (event?: BaseSyntheticEvent) => Promise<void>;
    handleCalcelCreateTenant: () => void;
    /* props */
    createTenantFieldProps: FieldSetProps[];
}

export interface CreateTenantProviderProps extends ChildrenProps {
    context: CreateTenantContextProps;
}
