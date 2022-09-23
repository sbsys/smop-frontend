/* react */
import { memo } from 'react';
/* context */
import { PasswordRecoveryProvider } from './PasswordRecovery.context';
/* custom hook */
import { usePasswordRecovery } from './usePasswordRecovery.hook';
/* components */
import { PasswordRecovery } from './PasswordRecovery';

const PasswordRecoveryView = () => {
    const { context } = usePasswordRecovery();
    return (
        <PasswordRecoveryProvider context={context}>
            <PasswordRecovery />
        </PasswordRecoveryProvider>
    );
};

export default memo(PasswordRecoveryView);
