/* react */
import { memo } from 'react';
/* context */
import { useUserListContext } from '../UserList.context';
/* layouts */
import { DropLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { UserListFilter } from '../UserListFilter';
import { NewUserAction } from '../UserListActions';
import { UserListItem } from '../UserListItem';
/* hooks */
import { useAdminLang } from 'admin/core';
/* assets */
import { MdClose, MdFilterList } from 'react-icons/md';
/* styles */
import styles from './UserListMobile.module.scss';

const UserListMobile = () => {
    const {
        /* states */
        isBreakPoint,
        isDropFilter,
        showDropFilter,
        hideDropFilter,
        userList,
    } = useUserListContext();

    const { translate } = useAdminLang();

    return (
        <PanelLayout className={styles.UserList}>
            <div className={styles.Header}>
                <h1 title={translate('userlist.title')}>
                    <Legend hasDots>{translate('userlist.title')}</Legend>
                </h1>

                <DropLayout
                    isDrop={isDropFilter && !isBreakPoint}
                    dropCol="start"
                    dropRow="end"
                    anchorCol="start"
                    anchorRow="end"
                    drop={
                        <PanelLayout className={styles.FilterContent} orientation="col">
                            <Button onClick={hideDropFilter} title={translate('actions.close')}>
                                <i>
                                    <MdClose />
                                </i>
                            </Button>

                            <UserListFilter />
                        </PanelLayout>
                    }>
                    <Button className={styles.Filter} onClick={showDropFilter} title={translate('actions.open')}>
                        <i>
                            <MdFilterList />
                        </i>
                    </Button>
                </DropLayout>
            </div>

            <span>
                <NewUserAction />
            </span>

            <ScrollLayout classNameContent={styles.List} orientation="col">
                <ul>
                    {userList.map((user, index) => (
                        <li key={index}>
                            <UserListItem {...user} />
                        </li>
                    ))}
                </ul>
            </ScrollLayout>
        </PanelLayout>
    );
};

export default memo(UserListMobile);
