/* props */
import { ChildrenProps } from 'shared/props';
import { FieldSetProps } from 'admin/core';

export interface CreateTenantContextProps {
    /* props */
    schemaProps: FieldSetProps;
    emailProps: FieldSetProps;
    passwordProps: FieldSetProps;
    repeatPasswordProps: FieldSetProps;
}

export interface CreateTenantProviderProps extends ChildrenProps {
    context: CreateTenantContextProps;
}
