/* react */
import { memo } from 'react';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Button } from 'shared/components';
import { FieldSet } from 'admin/core';
/* assets */
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { OrgsBGSrc } from 'assets';
/* styles */
import { ButtonStyles, CardStyles, FieldStyles } from 'shared/styles';
import styles from './SignIn.module.scss';

const SignIn = () => {
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
                <form className={CardStyles.Primary} onSubmit={event => event.preventDefault()}>
                    <legend>Sign In Admins</legend>

                    <FieldSet
                        field={{ className: FieldStyles.OutlinePrimary, strategy: 'email', placeholder: 'Email' }}
                        hint={{
                            children: 'Hint',
                        }}
                    />

                    <FieldSet
                        field={{
                            className: FieldStyles.OutlinePrimary,
                            strategy: 'password',
                            placeholder: 'Password',
                            showIcon: <IoMdEye />,
                            hideIcon: <IoMdEyeOff />,
                        }}
                        hint={{
                            children: 'Hint',
                        }}
                    />

                    <Button className={ButtonStyles.FillPrimary} type="submit">
                        Sign In
                    </Button>
                </form>
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(SignIn);
