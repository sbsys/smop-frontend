/* react */
import { FC, memo } from 'react';
/* components */
import { Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* utils */
import { classNames } from 'shared/utils';
/* types */
import { CommerceState } from 'admin/commerces/types';
/* styles */
import styles from './CommerceListState.module.scss';

const CommerceListState: FC<{ state: CommerceState }> = ({ state }) => {
    const { translate } = useAdminLang();

    const stateStylesStrategy: Record<CommerceState, string> = {
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

export default memo(CommerceListState);
