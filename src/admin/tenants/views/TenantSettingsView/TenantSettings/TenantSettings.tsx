/* react */
import { memo } from 'react';
/* layouts */
import { ScrollLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { ReferenceSection } from '../ReferenceSection';
import { BrandingSection } from '../BrandingSection';
import { UpdateBrandingModal } from '../UpdateBrandingModal';
/* styles */
import styles from '../TenantSettings.module.scss';

const TenantSettings = () => {
    return (
        <ScrollLayout classNameContent={styles.Settings} orientation="col">
            <h1>
                <Legend hasDots>Organization Settings</Legend>
            </h1>

            <ReferenceSection />

            <section>Language & decimals</section>

            <BrandingSection />
            <UpdateBrandingModal />
        </ScrollLayout>
    );
};

export default memo(TenantSettings);
