/* react */
import { memo } from 'react';
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
/* hooks */
import { useAdminLang } from 'admin/core';
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

    const { translate } = useAdminLang();

    return (
        <PanelLayout orientation="col" className={styles.ProductDetail}>
            <div className={styles.Header}>
                <Button
                    className={ButtonStyles.FillSecondary}
                    title={translate('actions.goback')}
                    onClick={handleGoBack}>
                    <i>
                        <MdArrowBack />
                    </i>
                </Button>

                <h1 title={translate('productdetail.title')}>
                    <Legend hasDots>{translate('productdetail.title')}</Legend>
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
