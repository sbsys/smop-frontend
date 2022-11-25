import { FC, memo } from 'react';
/* context */
import { useUserListContext } from '../UserList.context';
/* components */
import { Button } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
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

    const { translate } = useAdminLang();

    return (
        <div className={styles.Actions}>
            {state === 'active' ? (
                <Button
                    className={styles.Delete}
                    onClick={() => handleSelectUserToUpdateState(userId)}
                    title={translate('actions.suspend')}>
                    <i>
                        <MdThumbDown />
                    </i>
                </Button>
            ) : (
                <Button
                    className={styles.Restore}
                    onClick={() => handleSelectUserToUpdateState(userId)}
                    title={translate('actions.restore')}>
                    <i>
                        <MdThumbUp />
                    </i>
                </Button>
            )}

            <Button
                className={styles.Link}
                onClick={() => handleSelectUserToLink(userId)}
                title={translate('actions.link')}>
                <i>
                    <MdLink />
                </i>
            </Button>
        </div>
    );
};

export default memo(UserListActions);
