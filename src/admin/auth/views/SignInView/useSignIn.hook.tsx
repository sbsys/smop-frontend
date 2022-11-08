/* react */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
/* store */
import { authStoreSignIn } from 'admin/auth/store';
/* props */
import { AdminLang, FieldSetProps, useAdminDispatch } from 'admin/core';
import { SignInContext } from './SignIn.props';
/* hooks */
import { useActive, useLoader, useLocalStorage } from 'shared/hooks';
import { useAdminLang, useAdminNotify } from 'admin/core/hooks';
/* services */
import { signInService } from 'admin/auth/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* types */
import { SignInDTO } from 'admin/auth/types';
/* assets */
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { MdBookmarkAdded, MdDangerous } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';

interface SignInForm {
    email: string;
    password: string;
}

const SignInSchema = yup
    .object({
        email: yup
            .string()
            .email('auth.email.format' as AdminLang)
            .required('auth.email.required' as AdminLang),
        password: yup
            .string()
            .required('auth.password.required' as AdminLang)
            .min(8, 'auth.password.min' as AdminLang),
    })
    .required();

export const useSignIn = () => {
    /* states */
    const [isPassword, showPassword, hidePassword] = useActive();

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { translate } = useAdminLang();

    const navigate = useNavigate();

    const dispatch = useAdminDispatch();

    const [, setAuthLocalStorage] = useLocalStorage<SignInDTO>('auth', {} as SignInDTO);

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

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        dispatch(authStoreSignIn(service.data));

        setAuthLocalStorage(service.data);

        notify('info', {
            title: 'Logged in',
            icon: <MdBookmarkAdded />,
            text: service.message,
            timestamp: new Date(),
        });

        navigate('/admin/dashboard', { replace: true });
    });

    const navigateToPasswordRecovery = () => navigate('/admin/security/password-recovery');

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

    /* context */
    const context: SignInContext = {
        /* functions */
        handleSignIn,
        navigateToPasswordRecovery,
        /* props */
        emailProps,
        passwordProps,
    };

    return { context };
};
