/* react */
import { memo } from 'react';
/* custom hook */
import { useUserList } from './useUserList.hook';
/* context */
import { UserListProvider } from './UserList.context';
/* components */
import { UserListMobile } from './UserListMobile';
import { UserListDesktop } from './UserListDesktop';

const UserListView = () => {
    const { context } = useUserList();

    return (
        <UserListProvider context={context}>
            <UserListMobile />

            <UserListDesktop />
        </UserListProvider>
    );
};

export default memo(UserListView);
