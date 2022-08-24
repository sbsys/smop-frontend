/* react */
import { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { Context } from '../SignIn.context';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { FieldSet } from 'admin/core';
/* assets */
import { OrgsBGSrc } from 'assets';
/* styles */
import { ButtonStyles, CardStyles } from 'shared/styles';
import styles from './SignIn.module.scss';

const SignIn = () => {
    const {
        /* functions */
        handleSignIn,
        /* props */
        emailProps,
        passwordProps,
    } = useContext(Context);

    const { t } = useTranslation();

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
                    <legend title={t('views.signin.form.title')}>
                        <Legend hasDots>{t('views.signin.form.title')}</Legend>
                    </legend>

                    <FieldSet {...emailProps} />

                    <FieldSet {...passwordProps} />

                    <Button className={ButtonStyles.FillPrimary} type="submit" title={t('views.signin.form.signin')}>
                        <Legend hasDots justify="center">
                            {t('views.signin.form.signin')}
                        </Legend>
                    </Button>
                </form>
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(SignIn);
