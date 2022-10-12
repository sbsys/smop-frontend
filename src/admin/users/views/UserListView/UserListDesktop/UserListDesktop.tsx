/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useUserListContext } from '../UserList.context';
/* layouts */
import { PanelLayout, TableLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { UserListFilter } from '../UserListFilter';
import { NewUserAction, UserListActions } from '../UserListActions';
import { UserListState } from '../UserListState';
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

    const { t } = useTranslation();

    return (
        <PanelLayout className={styles.UserList}>
            <h1 title={t('views.userlist.title')}>
                <Legend hasDots>{t('views.userlist.title')}</Legend>
            </h1>

            {isBreakPoint && (
                <section className={styles.Filter}>
                    <UserListFilter />
                </section>
            )}

            <section className={styles.Users}>
                <TableLayout
                    className={styles.List}
                    header={{
                        columns: [
                            {
                                children: (
                                    <Legend hasDots title={t('views.userlist.list.name')}>
                                        {t('views.userlist.list.name')}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={t('views.userlist.list.profile')}>
                                        {t('views.userlist.list.profile')}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={t('views.userlist.list.created')}>
                                        {t('views.userlist.list.created')}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={t('views.userlist.list.state')}>
                                        {t('views.userlist.list.state')}
                                    </Legend>
                                ),
                            },
                            {
                                span: 1,
                                children: <NewUserAction />,
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
                                            <Legend hasDots justify="center" title={t(`profiles.${item.profileName}`)}>
                                                {t(`profiles.${item.profileName}`)}
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
