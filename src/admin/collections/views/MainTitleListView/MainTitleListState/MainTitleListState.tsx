/* react */
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
/* components */
import { Legend } from 'shared/components';
/* utils */
import { classNames } from 'shared/utils';
/* types */
import { TitleState } from 'admin/collections/types';
/* styles */
import styles from './MainTitleListState.module.scss';

const MainTitleListState: FC<{ state: TitleState }> = ({ state }) => {
    const { t } = useTranslation();

    const stateStylesStrategy: Record<TitleState, string> = {
        active: styles.StateActive,
        inactive: styles.StateInactive,
    };

    return (
        <Legend
            className={classNames(styles.State, stateStylesStrategy[state])}
            hasDots
            justify="center"
            title={t(`views.maintitlelist.list.states.${state}`)}>
            {t(`views.maintitlelist.list.states.${state}`)}
        </Legend>
    );
};

export default memo(MainTitleListState);
