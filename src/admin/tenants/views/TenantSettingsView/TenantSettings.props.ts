/* props */
import { ChildrenProps } from 'shared/props';
import { FieldSetProps } from 'admin/core';

export interface TenantSettingsContextProps {
    /* props */
    formFields: FieldSetProps[];
}

export interface TenantSettingsProviderProps extends ChildrenProps {
    context: TenantSettingsContextProps;
}
