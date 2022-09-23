/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { FieldSetProps } from 'admin/core';
import { ChildrenProps } from 'shared/props';

export interface PasswordRecoveryContextProps {
    /* functions */
    handlePasswordRecovery: (event?: BaseSyntheticEvent) => Promise<void>;
    /* props */
    passwordRecoveryFieldProps: FieldSetProps[];
}

export interface PasswordRecoveryProviderProps extends ChildrenProps {
    context: PasswordRecoveryContextProps;
}
