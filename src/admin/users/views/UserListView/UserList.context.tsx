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
    selectedUserToUpdateState: null,
    selectedUserToLink: null,
    /* functions */
    getUserList: () => new Promise(resolve => resolve()),
    handleFilter: () => new Promise(resolve => resolve),
    handleResetFilter: () => {},
    handleSelectUserToUpdateState: _ => {},
    handleUnselectUserToUpdateState: () => {},
    handleSelectUserToLink: _ => {},
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
