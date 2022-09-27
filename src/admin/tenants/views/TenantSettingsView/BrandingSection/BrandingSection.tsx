/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useTenantSettingsContext } from '../TenantSettings.context';
/* components */
import { Button, Legend } from 'shared/components';
/* assets */
import { MdEdit } from 'react-icons/md';
import { TenantCoverSrc, TenantProfileSrc } from 'assets';
/* styles */
import { ButtonStyles } from 'shared/styles';
import SectionStyles from '../TenantSettings.module.scss';
import styles from './BrandingSection.module.scss';

const BrandingSection = () => {
    const {
        /* states */
        showUpdateBranding,
    } = useTenantSettingsContext();

    const { t } = useTranslation();

    return (
        <section className={SectionStyles.Section}>
            <div className={SectionStyles.Title}>
                <h2 title={t('views.brandingsection.title')}>
                    <Legend hasDots>{t('views.brandingsection.title')}</Legend>
                </h2>

                <Button
                    className={ButtonStyles.OutlineNone}
                    onClick={showUpdateBranding}
                    title={t('views.brandingsection.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Branding}>
                <img src={TenantCoverSrc} alt={t('views.brandingsection.cover')} />

                <img src={TenantProfileSrc} alt={t('views.brandingsection.profile')} />
            </div>
        </section>
    );
};

export default memo(BrandingSection);
