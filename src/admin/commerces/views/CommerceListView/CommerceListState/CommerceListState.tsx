/* react */
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
/* components */
import { Legend } from 'shared/components';
/* utils */
import { classNames } from 'shared/utils';
/* types */
import { CommerceState } from 'admin/commerces/types';
/* styles */
import styles from './CommerceListState.module.scss';

const CommerceListState: FC<{ state: CommerceState }> = ({ state }) => {
    const { t } = useTranslation();

    const stateStylesStrategy: Record<CommerceState, string> = {
        active: styles.StateActive,
        inactive: styles.StateInactive,
    };

    return (
        <Legend
            className={classNames(styles.State, stateStylesStrategy[state])}
            hasDots
            justify="center"
            title={t(`views.commercelist.list.states.${state}`)}>
            {t(`views.commercelist.list.states.${state}`)}
        </Legend>
    );
};

export default memo(CommerceListState);
