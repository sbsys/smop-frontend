/* react */
import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { FieldSetProps } from 'admin/core';
import { CreateTenantContextProps } from './CreateTenant.props';
/* components */
import { Button } from 'shared/components';
/* hooks */
import { useActive } from 'shared/hooks';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* assets */
import { MdAlternateEmail } from 'react-icons/md';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
/* styles */
import { FieldStyles } from 'shared/styles';

interface CreateTenantForm {
    schema: string;
    email: string;
    password: string;
    repeat_password: string;
}

const CreateTenantSchema = yup
    .object({
        schema: yup
            .string()
            .required('views.createtenant.form.schema.required')
            .matches(/^[a-z]+$/, 'views.createtenant.form.schema.alphabets'),
        email: yup
            .string()
            .required('views.createtenant.form.email.required')
            .email('views.createtenant.form.email.format'),
        password: yup
            .string()
            .required('views.createtenant.form.password.required')
            .min(8, 'views.createtenant.form.password.min'),
        repeat_password: yup
            .string()
            .required('views.createtenant.form.repeatpassword.required')
            .oneOf([yup.ref('password')], 'views.createtenant.form.repeatpassword.equal'),
    })
    .required();

export const useCreateTenant = () => {
    /* states */
    const {
        formState: { errors },
        handleSubmit,
        register,
        setFocus,
        setValue,
        trigger,
        watch,
    } = useForm<CreateTenantForm>({
        mode: 'all',
        resolver: yupResolver(CreateTenantSchema),
    });

    const [isPassword, showPassword, hidePassword] = useActive();

    const { t } = useTranslation();

    /* functions */
    const handleCreateTenant = handleSubmit(async data => console.log(data));

    const handleGenerateEmailBySchema = async (event?: BaseSyntheticEvent) => {
        event?.preventDefault();

        const result = await trigger('schema', { shouldFocus: true });

        if (!result) return;

        setValue('email', `admin@${watch('schema')}.com`, { shouldValidate: true });
        setFocus('password');
    };

    /* props */
    const schemaProps: FieldSetProps = {
        field: {
            className: errors.schema ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: t('views.createtenant.form.schema.placeholder'),
            ...register('schema'),
        },
        isHintReserved: true,
        hint: errors.schema
            ? {
                  children: t(errors.schema.message as string),
                  hasDots: true,
                  title: t(errors.schema.message as string),
              }
            : {
                  children: t('views.createtenant.form.schema.hint'),
                  hasDots: true,
                  title: t('views.createtenant.form.schema.hint'),
              },
    };

    const GenerateEmailBySchema = () => (
        <Button
            type="button"
            onClick={handleGenerateEmailBySchema}
            title={t('views.createtenant.form.email.hintgenerate')}>
            <i>
                <MdAlternateEmail />
            </i>
        </Button>
    );

    const emailProps: FieldSetProps = {
        field: {
            className: errors.email ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'email',
            placeholder: t('views.createtenant.form.email.placeholder'),
            ...register('email'),
            afterContent: <GenerateEmailBySchema />,
        },
        isHintReserved: true,
        hint: errors.email
            ? {
                  children: t(errors.email.message as string),
                  hasDots: true,
                  title: t(errors.email.message as string),
              }
            : {
                  children: t('views.createtenant.form.email.hint'),
                  hasDots: true,
                  title: t('views.createtenant.form.email.hint'),
              },
    };

    const passwordProps: FieldSetProps = {
        field: {
            className: errors.password ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'password',
            placeholder: t('views.createtenant.form.password.placeholder'),
            ...register('password'),
            isPasswordVisible: isPassword,
            showIcon: <IoMdEye />,
            onShowPassword: showPassword,
            hideIcon: <IoMdEyeOff />,
            onHidePassword: hidePassword,
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

    const repeatPasswordProps: FieldSetProps = {
        field: {
            className: errors.repeat_password ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'password',
            placeholder: t('views.createtenant.form.repeatpassword.placeholder'),
            ...register('repeat_password'),
            isPasswordVisible: isPassword,
            showIcon: <IoMdEye />,
            onShowPassword: showPassword,
            hideIcon: <IoMdEyeOff />,
            onHidePassword: hidePassword,
        },
        isHintReserved: true,
        hint: errors.repeat_password
            ? {
                  children: t(errors.repeat_password.message as string),
                  hasDots: true,
                  title: t(errors.repeat_password.message as string),
              }
            : undefined,
    };

    /* context */
    const context: CreateTenantContextProps = {
        /* functions */
        handleCreateTenant,
        /* props */
        schemaProps,
        emailProps,
        passwordProps,
        repeatPasswordProps,
    };

    return { context };
};
