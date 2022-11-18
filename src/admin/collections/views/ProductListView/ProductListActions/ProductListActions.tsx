import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
/* store */
import { selectAuthStore } from 'admin/auth';
/* context */
import { useProductListContext } from '../ProductList.context';
/* hooks */
import { useAdminLang, useAdminSelector } from 'admin/core';
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
        user: { profiles },
    } = useAdminSelector(selectAuthStore);

    const {
        /* functions */
        handleSelectProductToUpdateState,
    } = useProductListContext();

    const navigate = useNavigate();

    const { translate } = useAdminLang();

    return (
        <div className={styles.Actions}>
            {profiles !== 'admin' ? null : (
                <>
                    {state === 'active' ? (
                        <Button
                            className={styles.Delete}
                            onClick={() => {
                                handleSelectProductToUpdateState(productId);
                            }}
                            title={translate('actions.suspend')}>
                            <i>
                                <MdThumbDown />
                            </i>
                        </Button>
                    ) : (
                        <Button
                            className={styles.Restore}
                            onClick={() => {
                                handleSelectProductToUpdateState(productId);
                            }}
                            title={translate('actions.restore')}>
                            <i>
                                <MdThumbUp />
                            </i>
                        </Button>
                    )}
                </>
            )}

            <Button
                className={styles.View}
                onClick={() => navigate(productId)}
                disabled={state === 'inactive'}
                title={translate('actions.detail')}>
                <i>
                    <MdVisibility />
                </i>
            </Button>
        </div>
    );
};

export default memo(ProductListActions);
