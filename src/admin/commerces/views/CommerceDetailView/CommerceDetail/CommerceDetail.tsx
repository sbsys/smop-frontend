/* react */
import { FC, memo } from 'react';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* layouts */
import { PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { CommerceReferenceSection } from '../CommerceReferenceSection';
import { UpdateReferenceModal } from '../UpdateReferenceModal';
import { CommerceSettingSection } from '../CommerceSettingSection';
import { UpdateSettingModal } from '../UpdateSettingModal';
import { CommerceAttentionSection } from '../CommerceAttentionSection';
import { UpdateAttentionModal } from '../UpdateAttentionModal';
import { CommerceDeliverySection } from '../CommerceDeliverySection';
import { UpdateDeliveryModal } from '../UpdateDeliveryModal';
/* hooks */
import { useAdminLang } from 'admin/core';
/* assets */
import { MdArrowBack } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './CommerceDetail.module.scss';

const CommerceDetail: FC<{ isHeaderHide?: boolean }> = ({ isHeaderHide = false }) => {
    const {
        /* functions */
        handleGoBack,
    } = useCommerceDetailContext();

    const { translate } = useAdminLang();

    return (
        <PanelLayout className={styles.CommerceDetail} orientation="col">
            {!isHeaderHide && (
                <div className={styles.Header}>
                    <Button
                        className={ButtonStyles.FillSecondary}
                        title={translate('actions.goback')}
                        onClick={handleGoBack}>
                        <i>
                            <MdArrowBack />
                        </i>
                    </Button>

                    <h1 title={translate('commercedetail.title')}>
                        <Legend hasDots>{translate('commercedetail.title')}</Legend>
                    </h1>
                </div>
            )}

            <ScrollLayout orientation="col">
                <div className={styles.Content}>
                    <CommerceReferenceSection />
                    <UpdateReferenceModal />

                    <CommerceSettingSection />
                    <UpdateSettingModal />

                    <CommerceDeliverySection />
                    <UpdateDeliveryModal />

                    <CommerceAttentionSection />
                    <UpdateAttentionModal />
                </div>
            </ScrollLayout>
        </PanelLayout>
    );
};

export default memo(CommerceDetail);
