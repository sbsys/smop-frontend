/* react */
import { memo } from 'react';
/* context */
import { useTenantSettingsContext } from '../TenantSettings.context';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* assets */
import { MdEdit } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import SectionStyles from '../TenantSettings.module.scss';
import styles from './BrandingSection.module.scss';

const BrandingSection = () => {
    const {
        /* states */
        settings,
        showUpdateBranding,
    } = useTenantSettingsContext();

    const { translate } = useAdminLang();

    return (
        <section className={SectionStyles.Section}>
            <div className={SectionStyles.Title}>
                <h2 title={translate('orgdetail.branding')}>
                    <Legend hasDots>{translate('orgdetail.branding')}</Legend>
                </h2>

                <Button
                    className={ButtonStyles.OutlineNone}
                    onClick={showUpdateBranding}
                    title={translate('actions.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            {(settings?.files.length ?? 0) > 0 && (
                <div className={styles.Branding}>
                    <img crossOrigin="anonymous" src={settings?.files.find(file => file.isCover)?.url} alt="cover" />

                    <img crossOrigin="anonymous" src={settings?.files.find(file => !file.isCover)?.url} alt="profile" />
                </div>
            )}
        </section>
    );
};

export default memo(BrandingSection);
