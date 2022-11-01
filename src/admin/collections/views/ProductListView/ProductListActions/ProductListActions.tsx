import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
/* context */
import { useProductListContext } from '../ProductList.context';
/* components */
import { Button } from 'shared/components';
/* types */
import { ProductState } from 'admin/collections/types';
/* assets */
import { MdThumbDown, MdThumbUp, MdVisibility } from 'react-icons/md';
/* styles */
import styles from './ProductList.module.scss';

const ProductListActions: FC<{ state: ProductState; productId: string }> = ({ state, productId }) => {
    const {
        /* functions */
        /* handleSelectTitleToUpdate,
        handleSelectTitleToUpdateState, */
    } = useProductListContext();

    const navigate = useNavigate();

    const { t } = useTranslation();

    return (
        <div className={styles.Actions}>
            {state === 'active' ? (
                <Button
                    className={styles.Delete}
                    onClick={() => {
                        /* handleSelectTitleToUpdateState(titleId) */
                    }}
                    title={t('views.productlist.list.suspend')}>
                    <i>
                        <MdThumbDown />
                    </i>
                </Button>
            ) : (
                <Button
                    className={styles.Restore}
                    onClick={() => {
                        /* handleSelectTitleToUpdateState(titleId) */
                    }}
                    title={t('views.productlist.list.restore')}>
                    <i>
                        <MdThumbUp />
                    </i>
                </Button>
            )}

            <Button
                className={styles.View}
                onClick={() => navigate(productId)}
                disabled={state === 'inactive'}
                title={t('views.productlist.list.view')}>
                <i>
                    <MdVisibility />
                </i>
            </Button>
        </div>
    );
};

export default memo(ProductListActions);
