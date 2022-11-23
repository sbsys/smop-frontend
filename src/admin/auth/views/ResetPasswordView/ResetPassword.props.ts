/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { FieldSetProps } from 'admin/core';
import { ChildrenProps } from 'shared/props';

export interface ResetPasswordContextProps {
    /* functions */
    handleResetPassword: (event?: BaseSyntheticEvent) => Promise<void>;
    /* props */
    resetPasswordFieldProps: FieldSetProps[];
}

export interface ResetPasswordProviderProps extends ChildrenProps {
    context: ResetPasswordContextProps;
}
