/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { FieldSetProps } from 'admin/core';

export interface SignInContext {
    /* functions */
    handleSignIn: (event?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
    /* props */
    emailProps: FieldSetProps;
    passwordProps: FieldSetProps;
}
