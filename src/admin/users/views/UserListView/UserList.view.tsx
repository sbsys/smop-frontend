/* react */
import { memo } from 'react';
import { useOutlet } from 'react-router-dom';
/* custom hook */
import { useUserList } from './useUserList.hook';
/* context */
import { UserListProvider } from './UserList.context';
/* layouts */
import { ModalLayout, PanelLayout } from 'shared/layouts';
/* components */
import { UserListMobile } from './UserListMobile';
import { UserListDesktop } from './UserListDesktop';
/* styles */
import styles from './UserList.module.scss';

const UserListView = () => {
    const { context } = useUserList();

    const outlet = useOutlet();

    return (
        <UserListProvider context={context}>
            <UserListMobile />

            <UserListDesktop />

            <ModalLayout isVisible={outlet !== null} rowAlignment="center" colAlignment="center" hasIndentation>
                <PanelLayout className={styles.RouteModal} orientation="col">
                    {outlet}
                </PanelLayout>
            </ModalLayout>
        </UserListProvider>
    );
};

export default memo(UserListView);
