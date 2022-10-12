/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
import { FieldSetProps } from 'admin/core';

export interface CreateUserContextProps {
    /* states */
    /* functions */
    handleCreateUser: (e?: BaseSyntheticEvent) => Promise<void>;
    handleCalcelCreateUser: () => void;
    /* props */
    createUserFieldProps: FieldSetProps[];
}

export interface CreateUserProviderProps extends ChildrenProps {
    context: CreateUserContextProps;
}
