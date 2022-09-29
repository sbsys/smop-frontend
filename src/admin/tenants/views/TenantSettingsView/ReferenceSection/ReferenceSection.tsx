/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useTenantSettingsContext } from '../TenantSettings.context';
/* components */
import { Button, Legend } from 'shared/components';
/* assets */
import { MdEdit } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import SectionStyles from '../TenantSettings.module.scss';
import styles from './ReferenceSection.module.scss';

const ReferenceSection = () => {
    const {
        /* states */
        showUpdateReference,
    } = useTenantSettingsContext();

    const { t } = useTranslation();

    return (
        <section className={SectionStyles.Section}>
            <div className={SectionStyles.Title}>
                <h2 title={t('views.referencesection.title')}>
                    <Legend hasDots>{t('views.referencesection.title')}</Legend>
                </h2>

                <Button
                    className={ButtonStyles.OutlineNone}
                    title={t('views.referencesection.edit')}
                    onClick={showUpdateReference}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Reference}>
                <Legend hasDots>
                    <span className={styles.Title}>{t('views.referencesection.organization')}:</span> Las Primas SA
                </Legend>

                <Legend hasDots>
                    <span className={styles.Title}>{t('views.referencesection.owner')}:</span> Steven Joseph Bustillo
                    López
                </Legend>
            </div>
        </section>
    );
};

export default memo(ReferenceSection);
