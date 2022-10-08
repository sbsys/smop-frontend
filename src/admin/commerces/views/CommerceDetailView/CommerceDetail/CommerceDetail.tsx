/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { CommerceReferenceSection } from '../CommerceReferenceSection';
import { UpdateReferenceModal } from '../UpdateReferenceModal';
import { CommerceSettingSection } from '../CommerceSettingSection';
import { UpdateSettingModal } from '../UpdateSettingModal';
import { CommerceAttentionSection } from '../CommerceAttentionSection';
import { CommerceDeliverySection } from '../CommerceDeliverySection';
/* styles */
import styles from './CommerceDetail.module.scss';

const CommerceDetail = () => {
    const { t } = useTranslation();

    return (
        <ScrollLayout classNameContent={styles.CommerceDetail} orientation="col">
            <h1 title={t('views.commercedetail.header')}>
                <Legend hasDots>{t('views.commercedetail.header')}</Legend>
            </h1>

            <CommerceReferenceSection />
            <UpdateReferenceModal />

            <CommerceSettingSection />
            <UpdateSettingModal />

            <CommerceAttentionSection />

            <CommerceDeliverySection />
        </ScrollLayout>
    );
};

export default memo(CommerceDetail);
