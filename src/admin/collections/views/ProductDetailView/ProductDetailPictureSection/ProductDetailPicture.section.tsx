/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* components */
import { Button, Legend } from 'shared/components';
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

    const { t } = useTranslation();

    return (
        <section className={styles.Picture}>
            <div className={styles.Header}>
                <h2 title={t('views.productdetail.picture.header')}>
                    <Legend hasDots>{t('views.productdetail.picture.header')}</Legend>
                </h2>

                <Button
                    className={ButtonStyles.OutlineNone}
                    onClick={showUpdatePicture}
                    title={t('views.productdetail.picture.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Content}>
                {product?.url ? (
                    <img src={product?.url} alt={product?.defaultReference} crossOrigin="anonymous" />
                ) : (
                    <Legend justify="center">{t('views.productdetail.picture.nopicture')}</Legend>
                )}
            </div>
        </section>
    );
};

export default memo(ProductDetailPictureSection);
