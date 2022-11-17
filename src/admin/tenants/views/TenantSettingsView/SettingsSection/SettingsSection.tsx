/* react */
import { memo } from 'react';
/* context */
import { useTenantSettingsContext } from '../TenantSettings.context';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* utils */
import { classNames } from 'shared/utils';
/* assets */
import { MdEdit } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import SectionStyles from '../TenantSettings.module.scss';
import styles from './SettingsSection.module.scss';

const SettingsSection = () => {
    const {
        /* states */
        settings,
        showUpdateSettings,
    } = useTenantSettingsContext();

    const { translate } = useAdminLang();

    return (
        <section className={SectionStyles.Section}>
            <div className={SectionStyles.Title}>
                <h2 title={translate('orgdetail.settings')}>
                    <Legend hasDots>{translate('orgdetail.settings')}</Legend>
                </h2>

                <Button
                    className={ButtonStyles.OutlineNone}
                    title={translate('actions.edit')}
                    onClick={showUpdateSettings}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Settings}>
                <Legend hasDots>
                    <span className={styles.Title}>{translate('orgdetail.decimals')}: </span>

                    <span>{settings?.decimals}</span>
                </Legend>

                <Legend hasDots>
                    <span className={styles.Title}>{translate('orgdetail.languages')}:</span>

                    <span className={styles.Flags}>
                        {settings?.internationalization.map((internationalization, index) => (
                            <img
                                key={index}
                                src={internationalization.flagpng}
                                alt={internationalization.abbreviation}
                                title={internationalization.abbreviation}
                                className={classNames(
                                    styles.Flag,
                                    internationalization.preferredLanguage && styles.Default
                                )}
                            />
                        ))}
                    </span>
                </Legend>
            </div>
        </section>
    );
};

export default memo(SettingsSection);
