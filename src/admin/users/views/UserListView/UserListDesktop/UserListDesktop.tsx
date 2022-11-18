/* react */
import { memo } from 'react';
/* context */
import { useUserListContext } from '../UserList.context';
/* layouts */
import { PanelLayout, TableLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { UserListFilter } from '../UserListFilter';
import { NewUserAction, UserListActions } from '../UserListActions';
import { UserListState } from '../UserListState';
/* hooks */
import { useAdminLang } from 'admin/core';
/* utils */
import { format } from 'date-fns';
/* styles */
import styles from './UserListDesktop.module.scss';

const UserListDesktop = () => {
    const {
        /* states */
        userList,
        isBreakPoint,
    } = useUserListContext();

    const { translate } = useAdminLang();

    return (
        <PanelLayout className={styles.UserList}>
            <h1 title={translate('userlist.title')}>
                <Legend hasDots>{translate('userlist.title')}</Legend>
            </h1>

            {isBreakPoint && (
                <section className={styles.Filter}>
                    <UserListFilter />
                </section>
            )}

            <span>
                <NewUserAction />
            </span>

            <section className={styles.Users}>
                <TableLayout
                    className={styles.List}
                    header={{
                        columns: [
                            {
                                children: (
                                    <Legend hasDots title={translate('headers.name')}>
                                        {translate('headers.name')}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={translate('headers.profile')}>
                                        {translate('headers.profile')}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={translate('headers.created')}>
                                        {translate('headers.created')}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={translate('headers.status')}>
                                        {translate('headers.status')}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={translate('headers.actions')}>
                                        {translate('headers.actions')}
                                    </Legend>
                                ),
                            },
                        ],
                    }}
                    body={userList.map(item => ({
                        columns: [
                            {
                                children: (
                                    <Legend hasDots title={item.fullname}>
                                        {item.fullname}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <>
                                        {item.profileName && (
                                            <Legend
                                                hasDots
                                                justify="center"
                                                title={translate(`profiles.${item.profileName}`)}>
                                                {translate(`profiles.${item.profileName}`)}
                                            </Legend>
                                        )}
                                    </>
                                ),
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={format(item.createdAt, 'MMM do, yyyy')}>
                                        {format(item.createdAt, 'MMM do, yyyy')}
                                    </Legend>
                                ),
                            },
                            {
                                children: <UserListState state={item.isActive} />,
                                span: 1,
                            },
                            {
                                children: <UserListActions state={item.isActive} userId={item.userId} />,
                                span: 1,
                            },
                        ],
                    }))}
                />
            </section>
        </PanelLayout>
    );
};

export default memo(UserListDesktop);
