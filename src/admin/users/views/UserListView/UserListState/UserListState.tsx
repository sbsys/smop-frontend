/* react */
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
/* components */
import { Legend } from 'shared/components';
/* utils */
import { classNames } from 'shared/utils';
/* types */
import { UserState } from 'admin/users/types';
/* styles */
import styles from './UserListState.module.scss';

const UserListState: FC<{ state: UserState }> = ({ state }) => {
    const { t } = useTranslation();

    const stateStylesStrategy: Record<UserState, string> = {
        active: styles.StateActive,
        inactive: styles.StateInactive,
    };

    return (
        <Legend
            className={classNames(styles.State, stateStylesStrategy[state])}
            hasDots
            justify="center"
            title={t(`views.userlist.list.states.${state}`)}>
            {t(`views.userlist.list.states.${state}`)}
        </Legend>
    );
};

export default memo(UserListState);
