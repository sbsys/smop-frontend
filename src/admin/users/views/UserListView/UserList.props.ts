/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
import { FieldSetProps } from 'admin/core';
/* types */
import { UserListItemDTO } from 'admin/users/types';

export interface UserListContextProps {
    /* states */
    userList: UserListItemDTO[];
    isDropFilter: boolean;
    showDropFilter: () => void;
    hideDropFilter: () => void;
    isBreakPoint: boolean;
    selectedUserToUpdateState: UserListItemDTO | null;
    selectedUserToLink: UserListItemDTO | null;
    /* functions */
    getUserList: () => Promise<void>;
    handleFilter: (event?: BaseSyntheticEvent) => Promise<void>;
    handleResetFilter: () => void;
    handleSelectUserToUpdateState: (id: string) => void;
    handleUnselectUserToUpdateState: () => void;
    handleSelectUserToLink: (id: string) => void;
    handleUnselectUserToLink: () => void;
    /* props */
    filterFormFields: FieldSetProps[];
}

export interface UserListProviderProps extends ChildrenProps {
    context: UserListContextProps;
}
