/* react */
import { memo } from 'react';
/* context */
import { Context } from './SignIn.context';
/* custom hook */
import { useSignIn } from './useSignIn.hook';
/* components */
import { SignIn } from './SignIn';

const SignInView = () => {
    const { context } = useSignIn();

    return (
        <Context.Provider value={context}>
            <SignIn />
        </Context.Provider>
    );
};

export default memo(SignInView);
