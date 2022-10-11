import { createContext, FC, useContext } from 'react';
import { UserListContextProps, UserListProviderProps } from './UserList.props';

const Context = createContext<UserListContextProps>({
    /* states */
    /* functions */
    /* props */
});

export const UserListProvider: FC<UserListProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useUserListContext = () => useContext(Context);
