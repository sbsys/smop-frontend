/* react */
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
/* components */
import { Legend } from 'shared/components';
/* utils */
import { classNames } from 'shared/utils';
/* types */
import { ProductState } from 'admin/collections/types';
/* styles */
import styles from './ProductListState.module.scss';

const ProductListState: FC<{ state: ProductState }> = ({ state }) => {
    const { t } = useTranslation();

    const stateStylesStrategy: Record<ProductState, string> = {
        active: styles.StateActive,
        inactive: styles.StateInactive,
    };

    return (
        <Legend
            className={classNames(styles.State, stateStylesStrategy[state])}
            hasDots
            justify="center"
            title={t(`views.productlist.list.states.${state}`)}>
            {t(`views.productlist.list.states.${state}`)}
        </Legend>
    );
};

export default memo(ProductListState);
