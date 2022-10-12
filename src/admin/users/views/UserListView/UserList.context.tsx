/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { UserListContextProps, UserListProviderProps } from './UserList.props';

const Context = createContext<UserListContextProps>({
    /* states */
    userList: [],
    isDropFilter: false,
    showDropFilter: () => {},
    hideDropFilter: () => {},
    isBreakPoint: false,
    selectedUserToLink: null,
    /* functions */
    getUserList: () => new Promise(resolve => resolve()),
    handleFilter: () => new Promise(resolve => resolve),
    handleResetFilter: () => {},
    handleSelectUserToLink: (id: string) => {},
    handleUnselectUserToLink: () => {},
    /* props */
    filterFormFields: [],
});

export const UserListProvider: FC<UserListProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useUserListContext = () => useContext(Context);
