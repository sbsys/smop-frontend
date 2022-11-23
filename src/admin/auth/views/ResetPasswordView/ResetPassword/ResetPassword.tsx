/* react */
import { memo } from 'react';
/* context */
import { useResetPasswordContext } from '../ResetPassword.context';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet, LanguageChanger, useAdminLang } from 'admin/core';
/* assets */
import { OrgsBGSrc } from 'assets';
/* styles */
import { ButtonStyles, CardStyles } from 'shared/styles';
import styles from './ResetPassword.module.scss';

const PasswordRecovery = () => {
    const {
        /* functions */
        handleResetPassword,
        /* props */
        resetPasswordFieldProps,
    } = useResetPasswordContext();

    const { translate } = useAdminLang();

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
                <form className={CardStyles.Primary} onSubmit={handleResetPassword}>
                    <legend title={translate('resetpassword.title')}>
                        <Legend hasDots>{translate('resetpassword.title')}</Legend>
                    </legend>

                    {resetPasswordFieldProps.map((field, index) => (
                        <FieldSet {...field} key={index} />
                    ))}

                    <Button
                        className={ButtonStyles.FillPrimary}
                        type="submit"
                        title={translate('resetpassword.actions.reset')}>
                        <Legend hasDots justify="center">
                            {translate('resetpassword.actions.reset')}
                        </Legend>
                    </Button>

                    <LanguageChanger />
                </form>
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(PasswordRecovery);
