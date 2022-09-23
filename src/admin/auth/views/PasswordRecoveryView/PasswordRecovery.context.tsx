/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { PasswordRecoveryContextProps, PasswordRecoveryProviderProps } from './PasswordRecovery.props';

export const PasswordRecoveryContext = createContext<PasswordRecoveryContextProps>({
    /* functions */
    handlePasswordRecovery: () => new Promise<void>(resolve => resolve()),
    /* props */
    passwordRecoveryFieldProps: [],
});

export const PasswordRecoveryProvider: FC<PasswordRecoveryProviderProps> = ({ context, children }) => {
    return (
        <PasswordRecoveryContext.Provider value={context}>
            {typeof children === 'function' ? children() : children}
        </PasswordRecoveryContext.Provider>
    );
};

export const usePasswordRecoveryContext = () => useContext(PasswordRecoveryContext);
