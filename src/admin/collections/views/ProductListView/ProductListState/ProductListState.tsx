/* react */
import { FC, memo } from 'react';
/* components */
import { Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* utils */
import { classNames } from 'shared/utils';
/* types */
import { ProductState } from 'admin/collections/types';
/* styles */
import styles from './ProductListState.module.scss';

const ProductListState: FC<{ state: ProductState }> = ({ state }) => {
    const { translate } = useAdminLang();

    const stateStylesStrategy: Record<ProductState, string> = {
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

export default memo(ProductListState);
