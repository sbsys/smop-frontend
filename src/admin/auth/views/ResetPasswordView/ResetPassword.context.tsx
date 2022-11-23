/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { ResetPasswordContextProps, ResetPasswordProviderProps } from './ResetPassword.props';

export const Context = createContext<ResetPasswordContextProps>({
    /* functions */
    handleResetPassword: () => new Promise<void>(resolve => resolve()),
    /* props */
    resetPasswordFieldProps: [],
});

export const ResetPasswordProvider: FC<ResetPasswordProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useResetPasswordContext = () => useContext(Context);
