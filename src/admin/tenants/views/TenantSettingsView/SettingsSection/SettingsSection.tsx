/* react */
import { memo, useEffect } from 'react';
/* context */
import { useTenantSettingsContext } from '../TenantSettings.context';
/* layouts */
import { AccordionLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useActive } from 'shared/hooks';
import { useAdminLang } from 'admin/core';
/* utils */
import { classNames } from 'shared/utils';
/* assets */
import { MdArrowDropDown, MdArrowDropUp, MdCopyAll, MdEdit } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import SectionStyles from '../TenantSettings.module.scss';
import styles from './SettingsSection.module.scss';

const SettingsSection = () => {
    const {
        /* states */
        settings,
        orgLink,
        showUpdateSettings,
        getOrganizationLink,
        handleCopyToClipboard,
    } = useTenantSettingsContext();

    const [isAccordion, , , toggleAccordion] = useActive();

    const { translate } = useAdminLang();

    /* reactivity */
    useEffect(() => {
        if (!isAccordion) return;

        getOrganizationLink();
    }, [getOrganizationLink, isAccordion]);

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

                <AccordionLayout
                    className={styles.Customers}
                    openTo="bottom"
                    isAccordion={isAccordion}
                    accordion={
                        <div className={styles.Link}>
                            <a href={orgLink} title={orgLink} rel="noreferrer" target="_blank">
                                <Legend hasDots>{orgLink}</Legend>
                            </a>

                            <Button className={ButtonStyles.FillPrimary} onClick={handleCopyToClipboard}>
                                <i>
                                    <MdCopyAll />
                                </i>
                            </Button>
                        </div>
                    }>
                    <Button
                        className={classNames(ButtonStyles.TextSecondary, styles.Generator)}
                        onClick={toggleAccordion}>
                        <Legend title={translate('orgdetail.link')}>{translate('orgdetail.link')}</Legend>

                        <i>{isAccordion ? <MdArrowDropUp /> : <MdArrowDropDown />}</i>
                    </Button>
                </AccordionLayout>
            </div>
        </section>
    );
};

export default memo(SettingsSection);
