/* react */
import { memo } from 'react';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* assets */
import { MdEdit } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './ProductDetailPicture.module.scss';

const ProductDetailPictureSection = () => {
    const {
        /* states */
        product,
        showUpdatePicture,
    } = useProductDetailContext();

    const { translate } = useAdminLang();

    return (
        <section className={styles.Picture}>
            <div className={styles.Header}>
                <h2 title={translate('productdetail.picture')}>
                    <Legend hasDots>{translate('productdetail.picture')}</Legend>
                </h2>

                <Button
                    className={ButtonStyles.OutlineNone}
                    onClick={showUpdatePicture}
                    title={translate('actions.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Content}>
                {product?.url ? (
                    <img src={product?.url} alt={product?.defaultReference} crossOrigin="anonymous" />
                ) : (
                    <Legend justify="center">{translate('productdetail.nopicture')}</Legend>
                )}
            </div>
        </section>
    );
};

export default memo(ProductDetailPictureSection);
