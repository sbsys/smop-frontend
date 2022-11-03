import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useUserListContext } from '../UserList.context';
/* components */
import { Button } from 'shared/components';
/* types */
import { UserState } from 'admin/users/types';
/* assets */
import { MdLink, MdThumbDown, MdThumbUp } from 'react-icons/md';
/* styles */
import styles from './UserListActions.module.scss';

const UserListActions: FC<{ state: UserState; userId: string }> = ({ state, userId }) => {
    const {
        /* functions */
        handleSelectUserToUpdateState,
        handleSelectUserToLink,
    } = useUserListContext();

    const { t } = useTranslation();

    return (
        <div className={styles.Actions}>
            {state === 'active' ? (
                <Button
                    className={styles.Delete}
                    onClick={() => handleSelectUserToUpdateState(userId)}
                    title={t('views.userlist.list.suspend')}>
                    <i>
                        <MdThumbDown />
                    </i>
                </Button>
            ) : (
                <Button
                    className={styles.Restore}
                    onClick={() => handleSelectUserToUpdateState(userId)}
                    title={t('views.userlist.list.restore')}>
                    <i>
                        <MdThumbUp />
                    </i>
                </Button>
            )}

            <Button
                className={styles.Link}
                onClick={() => handleSelectUserToLink(userId)}
                disabled={state === 'inactive'}
                title={t('views.userlist.list.link')}>
                <i>
                    <MdLink />
                </i>
            </Button>
        </div>
    );
};

export default memo(UserListActions);
