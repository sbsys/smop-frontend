/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { ReferenceSection } from '../ReferenceSection';
import { UpdateReferenceModal } from '../UpdateReferenceModal';
import { SettingsSection } from '../SettingsSection';
import { UpdateSettingsModal } from '../UpdateSettingsModal';
import { BrandingSection } from '../BrandingSection';
import { UpdateBrandingModal } from '../UpdateBrandingModal';
/* styles */
import styles from '../TenantSettings.module.scss';

const TenantSettings = () => {
    const { t } = useTranslation();

    return (
        <ScrollLayout classNameContent={styles.Settings} orientation="col">
            <h1 title={t('views.settingssection.header')}>
                <Legend hasDots>{t('views.settingssection.header')}</Legend>
            </h1>

            <ReferenceSection />
            <UpdateReferenceModal />

            <SettingsSection />
            <UpdateSettingsModal />

            <BrandingSection />
            <UpdateBrandingModal />
        </ScrollLayout>
    );
};

export default memo(TenantSettings);
