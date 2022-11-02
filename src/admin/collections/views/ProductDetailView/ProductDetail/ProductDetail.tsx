/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* layouts */
import { PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { ProductDetailGeneralSection } from '../ProductDetailGeneralSection';
import { ProductDetailPictureSection } from '../ProductDetailPictureSection';
import { ProductDetailCollectionSection } from '../ProductDetailCollectionSection';
import { ProductDetailAddonSection } from '../ProductDetailAddonSection';
/* assets */
import { MdArrowBack } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './ProductDetail.module.scss';

const ProductDetail = () => {
    const { t } = useTranslation();

    return (
        <PanelLayout orientation="col" className={styles.ProductDetail}>
            <div className={styles.Header}>
                <Button className={ButtonStyles.FillPrimary}>
                    <i>
                        <MdArrowBack />
                    </i>
                </Button>

                <h1 title={t('views.productdetail.header')}>
                    <Legend hasDots>{t('views.productdetail.header')}</Legend>
                </h1>
            </div>

            <ScrollLayout orientation="col">
                <div className={styles.Content}>
                    <ProductDetailGeneralSection />

                    <ProductDetailPictureSection />

                    <ProductDetailCollectionSection />

                    <ProductDetailAddonSection />
                </div>
            </ScrollLayout>
        </PanelLayout>
    );
};

export default memo(ProductDetail);
