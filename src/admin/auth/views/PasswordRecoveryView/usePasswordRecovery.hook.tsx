/* react */
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
/* props */
import { FieldSetProps } from 'admin/core';
import { PasswordRecoveryContextProps } from './PasswordRecovery.props';
/* hooks */
import { useActive, useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core/hooks';
/* services */
import { passwordRecoveryService } from 'admin/auth/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* assets */
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { MdBookmarkAdded, MdDangerous } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';

interface PasswordRecoveryForm {
    email: string;
    password: string;
    newPassword: string;
    repeatPassword: string;
}

const PasswordRecoverySchema = yup
    .object({
        email: yup
            .string()
            .email('views.passwordrecovery.form.email.format')
            .required('views.passwordrecovery.form.email.required'),
        password: yup.string().required('views.passwordrecovery.form.password.required'),
        newPassword: yup
            .string()
            .required('views.passwordrecovery.form.newpassword.required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
                'views.createtenant.form.password.format'
            ),
        repeatPassword: yup
            .string()
            .required('views.passwordrecovery.form.repeatpassword.required')
            .oneOf([yup.ref('newPassword')], 'views.passwordrecovery.form.repeatpassword.equal'),
    })
    .required();

export const usePasswordRecovery = () => {
    /* states */
    const [isPassword, showPassword, hidePassword] = useActive();

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { t } = useTranslation();

    const navigate = useNavigate();

    /* form */
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PasswordRecoveryForm>({
        resolver: yupResolver(PasswordRecoverySchema),
    });

    /* functions */

    const handlePasswordRecovery = handleSubmit(async data => {
        showLoader();

        const service = await passwordRecoveryService({
            email: data.email,
            password: data.password,
            newPassword: data.newPassword,
        });

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        notify('info', {
            title: 'Updated',
            icon: <MdBookmarkAdded />,
            text: service.message,
            timestamp: new Date(),
        });

        navigate('/admin/auth', { replace: true });
    });

    /* props */

    const emailProps: FieldSetProps = {
        field: {
            className: errors.email ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'email',
            placeholder: t('views.passwordrecovery.form.email.placeholder'),
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
            placeholder: t('views.passwordrecovery.form.password.placeholder'),
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

    const newPasswordProps: FieldSetProps = {
        field: {
            className: errors.newPassword ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'password',
            placeholder: t('views.passwordrecovery.form.newpassword.placeholder'),
            isPasswordVisible: isPassword,
            showIcon: <IoMdEye />,
            onShowPassword: showPassword,
            hideIcon: <IoMdEyeOff />,
            onHidePassword: hidePassword,
            ...register('newPassword'),
        },
        isHintReserved: true,
        hint: errors.newPassword
            ? {
                  children: t(errors.newPassword.message as string),
                  hasDots: true,
                  title: t(errors.newPassword.message as string),
              }
            : undefined,
    };

    const repeatPasswordProps: FieldSetProps = {
        field: {
            className:
                errors.newPassword || errors.repeatPassword ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'password',
            placeholder: t('views.passwordrecovery.form.repeatpassword.placeholder'),
            ...register('repeatPassword'),
            isPasswordVisible: isPassword,
            showIcon: <IoMdEye />,
            onShowPassword: showPassword,
            hideIcon: <IoMdEyeOff />,
            onHidePassword: hidePassword,
        },
        isHintReserved: true,
        hint: errors.repeatPassword
            ? {
                  children: t(errors.repeatPassword.message as string),
                  hasDots: true,
                  title: t(errors.repeatPassword.message as string),
              }
            : undefined,
    };

    const passwordRecoveryFieldProps: FieldSetProps[] = [
        emailProps,
        passwordProps,
        newPasswordProps,
        repeatPasswordProps,
    ];

    /* context */
    const context: PasswordRecoveryContextProps = {
        /* functions */
        handlePasswordRecovery,
        /* props */
        passwordRecoveryFieldProps,
    };

    return { context };
};
