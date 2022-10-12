import { createContext, FC, useContext } from 'react';
import { CreateUserContextProps, CreateUserProviderProps } from './CreateUser.props';

const Context = createContext<CreateUserContextProps>({
    /* states */
    /* functions */
    handleCreateUser: () => new Promise(resolve => resolve()),
    handleCalcelCreateUser: () => {},
    /* props */
    createUserFieldProps: [],
});

export const CreateUserProvider: FC<CreateUserProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useCreateUserContext = () => useContext(Context);
