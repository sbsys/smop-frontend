import { createContext, FC, useContext } from 'react';
import { UserListContextProps, UserListProviderProps } from './UserList.props';

const Context = createContext<UserListContextProps>({
    /* states */
    userList: [],
    isDropFilter: false,
    showDropFilter: () => {},
    hideDropFilter: () => {},
    isBreakPoint: false,
    /* functions */
    handleFilter: () => new Promise(resolve => resolve),
    handleResetFilter: () => {},
    /* props */
    filterFormFields: [],
});

export const UserListProvider: FC<UserListProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useUserListContext = () => useContext(Context);
