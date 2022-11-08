/* react */
import { memo, useContext } from 'react';
/* context */
import { Context } from '../SignIn.context';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet, LanguageChanger, useAdminLang } from 'admin/core';
/* assets */
import { OrgsBGSrc } from 'assets';
/* styles */
import { ButtonStyles, CardStyles } from 'shared/styles';
import styles from './SignIn.module.scss';

const SignIn = () => {
    const {
        /* functions */
        handleSignIn,
        /* navigateToPasswordRecovery, */
        /* props */
        emailProps,
        passwordProps,
    } = useContext(Context);

    const { translate } = useAdminLang();

    return (
        <PanelLayout className={styles.SignIn}>
            <PanelLayout className={styles.BG}>
                <img src={OrgsBGSrc} alt="SMOP Admins" />

                <PanelLayout className={styles.Branding}>
                    <h1>SMOP</h1>

                    <p>Admins</p>
                </PanelLayout>
            </PanelLayout>

            <PanelLayout className={styles.Form}>
                <form className={CardStyles.Primary} onSubmit={handleSignIn}>
                    <legend title={translate('signin.title')}>
                        <Legend hasDots>{translate('signin.title')}</Legend>
                    </legend>

                    <FieldSet {...emailProps} />

                    <FieldSet {...passwordProps} />

                    <Button
                        className={ButtonStyles.FillPrimary}
                        type="submit"
                        title={translate('signin.actions.signin')}>
                        <Legend hasDots justify="center">
                            {translate('signin.actions.signin')}
                        </Legend>
                    </Button>

                    {/* <Button
                        className={ButtonStyles.OutlineSecondary}
                        type="button"
                        title={t('views.signin.form.passwordrecovery')}
                        onClick={navigateToPasswordRecovery}>
                        <Legend hasDots justify="center">
                            {t('views.signin.form.passwordrecovery')}
                        </Legend>
                    </Button> */}

                    <LanguageChanger />
                </form>
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(SignIn);
