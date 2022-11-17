/* react */
import { memo } from 'react';
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
/* hooks */
import { useAdminLang } from 'admin/core';
/* styles */
import styles from '../TenantSettings.module.scss';

const TenantSettings = () => {
    const { translate } = useAdminLang();

    return (
        <ScrollLayout classNameContent={styles.Settings} orientation="col">
            <h1 title={translate('orgdetail.title')}>
                <Legend hasDots>{translate('orgdetail.title')}</Legend>
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
