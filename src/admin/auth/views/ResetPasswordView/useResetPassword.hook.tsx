/* react */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
/* props */
import { AdminLang, FieldSetProps } from 'admin/core';
import { ResetPasswordContextProps } from './ResetPassword.props';
/* hooks */
import { useActive, useLoader } from 'shared/hooks';
import { useAdminLang, useAdminNotify } from 'admin/core/hooks';
/* services */
import { resetPasswordService } from 'admin/auth/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* assets */
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { MdBookmarkAdded, MdDangerous } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';

interface ResetPasswordForm {
    email: string;
    password: string;
    newPassword: string;
    repeatPassword: string;
}

const ResetPasswordSchema = yup
    .object({
        email: yup.string().email('auth.email.format').required('auth.email.required'),
        password: yup.string().required('auth.password.required'),
        newPassword: yup
            .string()
            .required('auth.newpassword.required')
            .min(8, 'auth.password.min')
            .max(15, 'auth.password.max')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, 'auth.password.format'),
        repeatPassword: yup
            .string()
            .required('auth.repeatpassword.required')
            .oneOf([yup.ref('newPassword')], 'auth.repeatpassword.equal'),
    })
    .required();

export const useResetPassword = () => {
    /* states */
    const [isPassword, showPassword, hidePassword] = useActive();

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { translate } = useAdminLang();

    const navigate = useNavigate();

    /* form */
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordForm>({
        resolver: yupResolver(ResetPasswordSchema),
    });

    /* functions */

    const handleResetPassword = handleSubmit(async data => {
        showLoader();

        const service = await resetPasswordService({
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
            placeholder: translate('auth.email.placeholder'),
            ...register('email'),
        },
        isHintReserved: true,
        hint: errors.email
            ? {
                  children: translate(errors.email.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.email.message as AdminLang),
              }
            : undefined,
    };

    const passwordProps: FieldSetProps = {
        field: {
            className: errors.password ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'password',
            placeholder: translate('auth.password.placeholder'),
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
                  children: translate(errors.password.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.password.message as AdminLang),
              }
            : undefined,
    };

    const newPasswordProps: FieldSetProps = {
        field: {
            className: errors.newPassword ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'password',
            placeholder: translate('auth.newpassword.placeholder'),
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
                  children: translate(errors.newPassword.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.newPassword.message as AdminLang),
              }
            : undefined,
    };

    const repeatPasswordProps: FieldSetProps = {
        field: {
            className:
                errors.newPassword || errors.repeatPassword ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'password',
            placeholder: translate('auth.repeatpassword.placeholder'),
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
                  children: translate(errors.repeatPassword.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.repeatPassword.message as AdminLang),
              }
            : undefined,
    };

    const resetPasswordFieldProps: FieldSetProps[] = [emailProps, passwordProps, newPasswordProps, repeatPasswordProps];

    /* context */
    const context: ResetPasswordContextProps = {
        /* functions */
        handleResetPassword,
        /* props */
        resetPasswordFieldProps,
    };

    return { context };
};
