/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { CommerceReferenceSection } from '../CommerceReferenceSection';
/* styles */
import styles from './CommerceDetail.module.scss';

const CommerceDetail = () => {
    const { t } = useTranslation();

    return (
        <PanelLayout className={styles.CommerceDetail} orientation="col">
            <h1 title={t('views.commercedetail.header')}>
                <Legend hasDots>{t('views.commercedetail.header')}</Legend>
            </h1>

            <CommerceReferenceSection />
        </PanelLayout>
    );
};

export default memo(CommerceDetail);
