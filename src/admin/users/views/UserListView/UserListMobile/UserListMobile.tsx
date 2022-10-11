/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useUserListContext } from '../UserList.context';
/* layouts */
import { DropLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { UserListFilter } from '../UserListFilter';
import { NewUserAction } from '../UserListActions';
import { UserListItem } from '../UserListItem';
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

    const { t } = useTranslation();

    return (
        <PanelLayout className={styles.UserList}>
            <div className={styles.Header}>
                <h1 title={t('views.userlist.title')}>
                    <Legend hasDots>{t('views.userlist.title')}</Legend>
                </h1>

                <DropLayout
                    isDrop={isDropFilter && !isBreakPoint}
                    dropCol="start"
                    dropRow="end"
                    anchorCol="start"
                    anchorRow="end"
                    drop={
                        <PanelLayout className={styles.FilterContent} orientation="col">
                            <Button onClick={hideDropFilter} title={t('views.userlist.actions.closefilter')}>
                                <i>
                                    <MdClose />
                                </i>
                            </Button>

                            <UserListFilter />
                        </PanelLayout>
                    }>
                    <Button
                        className={styles.Filter}
                        onClick={showDropFilter}
                        title={t('views.userlist.actions.openfilter')}>
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
