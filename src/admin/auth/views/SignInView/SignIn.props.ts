/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { FieldSetProps } from 'admin/core';

export interface SignInContext {
    /* functions */
    handleSignIn: (event?: BaseSyntheticEvent) => Promise<void>;
    navigateToPasswordRecovery: () => void;
    /* props */
    emailProps: FieldSetProps;
    passwordProps: FieldSetProps;
}
