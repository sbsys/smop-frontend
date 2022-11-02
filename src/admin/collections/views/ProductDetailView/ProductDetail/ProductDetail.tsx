/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* layouts */
import { PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { ProductDetailGeneralSection } from '../ProductDetailGeneralSection';
import { UpdateGeneralModal } from '../UpdateGeneralModal';
import { ProductDetailPictureSection } from '../ProductDetailPictureSection';
import { UpdatePictureModal } from '../UpdatePictureModal';
import { ProductDetailCollectionSection } from '../ProductDetailCollectionSection';
import { UpdateCollectionModal } from '../UpdateCollectionModal';
import { ProductDetailAddonSection } from '../ProductDetailAddonSection';
import { UpdateAddonModal } from '../UpdateAddonModal';
/* assets */
import { MdArrowBack } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './ProductDetail.module.scss';

const ProductDetail = () => {
    const {
        /* functions */
        handleGoBack,
    } = useProductDetailContext();

    const { t } = useTranslation();

    return (
        <PanelLayout orientation="col" className={styles.ProductDetail}>
            <div className={styles.Header}>
                <Button
                    className={ButtonStyles.FillSecondary}
                    title={t('views.productdetail.goback')}
                    onClick={handleGoBack}>
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
                    <UpdateGeneralModal />

                    <ProductDetailPictureSection />
                    <UpdatePictureModal />

                    <ProductDetailCollectionSection />
                    <UpdateCollectionModal />

                    <ProductDetailAddonSection />
                    <UpdateAddonModal />
                </div>
            </ScrollLayout>
        </PanelLayout>
    );
};

export default memo(ProductDetail);
