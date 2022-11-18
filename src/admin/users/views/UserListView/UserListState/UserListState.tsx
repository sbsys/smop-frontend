/* react */
import { FC, memo } from 'react';
/* components */
import { Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* utils */
import { classNames } from 'shared/utils';
/* types */
import { UserState } from 'admin/users/types';
/* styles */
import styles from './UserListState.module.scss';

const UserListState: FC<{ state: UserState }> = ({ state }) => {
    const { translate } = useAdminLang();

    const stateStylesStrategy: Record<UserState, string> = {
        active: styles.StateActive,
        inactive: styles.StateInactive,
    };

    return (
        <Legend
            className={classNames(styles.State, stateStylesStrategy[state])}
            hasDots
            justify="center"
            title={translate(`status.${state}`)}>
            {translate(`status.${state}`)}
        </Legend>
    );
};

export default memo(UserListState);
