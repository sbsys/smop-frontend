/* react */
import { memo } from 'react';
/* context */
import { ResetPasswordProvider } from './ResetPassword.context';
/* custom hook */
import { useResetPassword } from './useResetPassword.hook';
/* components */
import { ResetPassword } from './ResetPassword';

const ResetPasswordView = () => {
    const { context } = useResetPassword();

    return (
        <ResetPasswordProvider context={context}>
            <ResetPassword />
        </ResetPasswordProvider>
    );
};

export default memo(ResetPasswordView);
