/* react */
import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
/* props */
import { FieldSetProps, useAdminNotify } from 'admin/core';
import { CreateTenantContextProps } from './CreateTenant.props';
/* components */
import { Button } from 'shared/components';
/* hooks */
import { useActive, useLoader } from 'shared/hooks';
/* services */
import { createTenantService } from 'admin/tenants/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* assets */
import { MdAlternateEmail, MdBookmarkAdded, MdDangerous } from 'react-icons/md';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
/* styles */
import { FieldStyles } from 'shared/styles';

interface CreateTenantForm {
    schema: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    repeat_password: string;
}

const CreateTenantSchema = yup
    .object({
        schema: yup
            .string()
            .required('views.createtenant.form.schema.required')
            .matches(/^[a-z]+$/, 'views.createtenant.form.schema.alphabets'),
        name: yup.string().required('views.createtenant.form.name.required'),
        phone: yup
            .string()
            .required('views.createtenant.form.phone.required')
            .matches(/^\+\d{3}-\d{7,8}$/, 'views.createtenant.form.phone.format'),
        email: yup
            .string()
            .required('views.createtenant.form.email.required')
            .email('views.createtenant.form.email.format'),
        password: yup
            .string()
            .required('views.createtenant.form.password.required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
                'views.createtenant.form.password.format'
            ),
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

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { t } = useTranslation();

    const navigate = useNavigate();

    /* functions */
    const handleCreateTenant = handleSubmit(async data => {
        showLoader();

        const service = await createTenantService({
            schema: data.schema,
            fullname: data.name,
            phoneNumber: data.phone,
            email: data.email,
            password: data.password,
        });

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        notify('success', {
            title: 'Created',
            icon: <MdBookmarkAdded />,
            text: service.message,
            timestamp: new Date(),
        });

        navigate(-1);
    });

    const handleGenerateEmailBySchema = async (event?: BaseSyntheticEvent) => {
        event?.preventDefault();

        const result = await trigger('schema', { shouldFocus: true });

        if (!result) return;

        setValue('email', `admin@${watch('schema')}.com`, { shouldValidate: true });
        setFocus('password');
    };

    const handleCalcelCreateTenant = () => navigate(-1);

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

    const nameProps: FieldSetProps = {
        field: {
            className: errors.name ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: t('views.createtenant.form.name.placeholder'),
            ...register('name'),
        },
        isHintReserved: true,
        hint: errors.name
            ? {
                  children: t(errors.name.message as string),
                  hasDots: true,
                  title: t(errors.name.message as string),
              }
            : {
                  children: t('views.createtenant.form.name.hint'),
                  hasDots: true,
                  title: t('views.createtenant.form.name.hint'),
              },
    };

    const phoneProps: FieldSetProps = {
        field: {
            className: errors.phone ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: t('views.createtenant.form.phone.placeholder'),
            ...register('phone'),
        },
        isHintReserved: true,
        hint: errors.phone
            ? {
                  children: t(errors.phone.message as string),
                  hasDots: true,
                  title: t(errors.phone.message as string),
              }
            : {
                  children: t('views.createtenant.form.phone.hint'),
                  hasDots: true,
                  title: t('views.createtenant.form.phone.hint'),
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
            : {
                  children: t('views.createtenant.form.password.hint'),
                  hasDots: true,
                  title: t('views.createtenant.form.password.hint'),
              },
    };

    const repeatPasswordProps: FieldSetProps = {
        field: {
            className:
                errors.password || errors.repeat_password ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
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

    const createTenantFieldProps = [schemaProps, nameProps, phoneProps, emailProps, passwordProps, repeatPasswordProps];

    /* context */
    const context: CreateTenantContextProps = {
        /* functions */
        handleCreateTenant,
        handleCalcelCreateTenant,
        /* props */
        createTenantFieldProps,
    };

    return { context };
};
