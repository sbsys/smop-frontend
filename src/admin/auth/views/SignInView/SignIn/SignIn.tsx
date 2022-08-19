/* react */
import { memo, useContext } from 'react';
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
                    <legend>
                        <Legend hasDots>Sign In Admins</Legend>
                    </legend>

                    <FieldSet {...emailProps} />

                    <FieldSet {...passwordProps} />

                    <Button className={ButtonStyles.FillPrimary} type="submit">
                        Sign In
                    </Button>
                </form>
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(SignIn);
