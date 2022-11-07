/* react */
import { FC, memo } from 'react';
/* hooks */
import { useAdminLang } from 'admin/core';
/* components */
import { Legend } from 'shared/components';
/* utils */
import { classNames } from 'shared/utils';
/* types */
import { TitleState } from 'admin/collections/types';
/* styles */
import styles from './AddonsTitleListState.module.scss';

const AddonsTitleListState: FC<{ state: TitleState }> = ({ state }) => {
    const { translate } = useAdminLang();

    const stateStylesStrategy: Record<TitleState, string> = {
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

export default memo(AddonsTitleListState);
