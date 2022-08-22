/* react */
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { FieldSetProps } from 'admin/core';
import { SignInContext } from './SignIn.props';
/* hooks */
import { useActive, useLoader } from 'shared/hooks';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* assets */
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
/* styles */
import { FieldStyles } from 'shared/styles';
import { signInService } from 'admin/auth/services';

interface SignInForm {
    email: string;
    password: string;
}

const SignInSchema = yup
    .object({
        email: yup.string().email('views.signin.form.email.format').required('views.signin.form.email.required'),
        password: yup.string().required('views.signin.form.password.required').min(8, 'views.signin.form.password.min'),
    })
    .required();

export const useSignIn = () => {
    /* states */
    const [isPassword, showPassword, hidePassword] = useActive();

    const { showLoader, hideLoader } = useLoader();

    const { t } = useTranslation();

    /* form */
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInForm>({
        resolver: yupResolver(SignInSchema),
    });

    /* functions */

    const handleSignIn = handleSubmit(async data => {
        showLoader();

        const service = await signInService(data);

        hideLoader();

        if (service.error) return alert(service.message);

        console.log(data);
    });

    /* props */

    const emailProps: FieldSetProps = {
        field: {
            className: errors.email ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'email',
            placeholder: t('views.signin.form.email.placeholder'),
            ...register('email'),
        },
        isHintReserved: true,
        hint: errors.email
            ? {
                  children: t(errors.email.message as string),
                  hasDots: true,
                  title: t(errors.email.message as string),
              }
            : undefined,
    };

    const passwordProps: FieldSetProps = {
        field: {
            className: errors.password ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'password',
            placeholder: t('views.signin.form.password.placeholder'),
            isPasswordVisible: isPassword,
            showIcon: <IoMdEye />,
            onShowPassword: showPassword,
            hideIcon: <IoMdEyeOff />,
            onHidePassword: hidePassword,
            ...register('password'),
        },
        isHintReserved: true,
        hint: errors.password
            ? {
                  children: t(errors.password.message as string),
                  hasDots: true,
                  title: t(errors.password.message as string),
              }
            : undefined,
    };

    /* context */
    const context: SignInContext = {
        /* functions */
        handleSignIn,
        /* props */
        emailProps,
        passwordProps,
    };

    return { context };
};
