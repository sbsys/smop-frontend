/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useTenantSettingsContext } from '../TenantSettings.context';
/* components */
import { Button, Legend } from 'shared/components';
/* utils */
import { classNames } from 'shared/utils';
/* assets */
import { MdEdit } from 'react-icons/md';
import { TenantCoverSrc, TenantProfileSrc } from 'assets';
/* styles */
import { ButtonStyles } from 'shared/styles';
import SectionStyles from '../TenantSettings.module.scss';
import styles from './SettingsSection.module.scss';

const SettingsSection = () => {
    const {
        /* states */
        showUpdateSettings,
    } = useTenantSettingsContext();

    const { t } = useTranslation();

    return (
        <section className={SectionStyles.Section}>
            <div className={SectionStyles.Title}>
                <h2 title={t('views.settingssection.title')}>
                    <Legend hasDots>{t('views.settingssection.title')}</Legend>
                </h2>

                <Button
                    className={ButtonStyles.OutlineNone}
                    title={t('views.settingssection.edit')}
                    onClick={showUpdateSettings}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Settings}>
                <Legend hasDots>
                    <span className={styles.Title}>{t('views.settingssection.decimals')}:</span> 2
                </Legend>

                <Legend hasDots>
                    <span className={styles.Title}>{t('views.settingssection.langs')}:</span>

                    <span className={styles.Flags}>
                        <img
                            src={TenantCoverSrc}
                            alt="en"
                            title="en"
                            className={classNames(styles.Flag, styles.Default)}
                        />
                        <img src={TenantProfileSrc} alt="es" title="es" className={styles.Flag} />
                    </span>
                </Legend>
            </div>
        </section>
    );
};

export default memo(SettingsSection);
