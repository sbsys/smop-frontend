/* react */
import { useForm } from 'react-hook-form';
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

interface SignInForm {
    email: string;
    password: string;
}

const SignInSchema = yup
    .object({
        email: yup.string().email('signin.email.error.email').required('signin.email.error.required'),
        password: yup.string().required('signin.password.error.required'),
    })
    .required();

export const useSignIn = () => {
    /* states */
    const [isPassword, showPassword, hidePassword] = useActive();

    const { showLoader, hideLoader } = useLoader();

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

        await new Promise(resolve => {
            setTimeout(() => {
                console.log(data);

                resolve({});
            }, 5000);
        });

        hideLoader();
    });

    /* props */

    const emailProps: FieldSetProps = {
        field: {
            className: errors.email ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'email',
            placeholder: 'Email',
            ...register('email'),
        },
        isHintReserved: true,
        hint: errors.email
            ? {
                  children: errors.email.message,
                  hasDots: true,
                  title: errors.email.message,
              }
            : undefined,
    };

    const passwordProps: FieldSetProps = {
        field: {
            className: errors.password ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'password',
            placeholder: 'Password',
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
                  children: errors.password.message,
                  hasDots: true,
                  title: errors.password.message,
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
