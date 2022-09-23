/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { usePasswordRecoveryContext } from '../PasswordRecovery.context';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet, LanguageChanger } from 'admin/core';
/* assets */
import { OrgsBGSrc } from 'assets';
/* styles */
import { ButtonStyles, CardStyles } from 'shared/styles';
import styles from './PasswordRecovery.module.scss';

const PasswordRecovery = () => {
    const {
        /* functions */
        handlePasswordRecovery,
        /* props */
        passwordRecoveryFieldProps,
    } = usePasswordRecoveryContext();

    const { t } = useTranslation();

    return (
        <PanelLayout className={styles.PasswordRecovery}>
            <PanelLayout className={styles.BG}>
                <img src={OrgsBGSrc} alt="SMOP Admins" />

                <PanelLayout className={styles.Branding}>
                    <h1>SMOP</h1>

                    <p>Admins</p>
                </PanelLayout>
            </PanelLayout>

            <PanelLayout className={styles.Form}>
                <form className={CardStyles.Primary} onSubmit={handlePasswordRecovery}>
                    <legend title={t('views.passwordrecovery.form.title')}>
                        <Legend hasDots>{t('views.passwordrecovery.form.title')}</Legend>
                    </legend>

                    {passwordRecoveryFieldProps.map((field, index) => (
                        <FieldSet {...field} key={index} />
                    ))}

                    <Button
                        className={ButtonStyles.FillPrimary}
                        type="submit"
                        title={t('views.passwordrecovery.form.passwordrecovery')}>
                        <Legend hasDots justify="center">
                            {t('views.passwordrecovery.form.passwordrecovery')}
                        </Legend>
                    </Button>

                    <LanguageChanger />
                </form>
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(PasswordRecovery);
