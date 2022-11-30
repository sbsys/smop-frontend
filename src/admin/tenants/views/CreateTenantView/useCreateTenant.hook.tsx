/* react */
import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
/* props */
import { AdminLang, FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
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
            .required('createorg.schema.required' as AdminLang)
            .matches(/^[a-z]+$/, 'createorg.schema.alphabets' as AdminLang),
        name: yup.string().required('createorg.name.required' as AdminLang),
        phone: yup
            .string()
            .required('auth.phone.required' as AdminLang)
            .matches(/^\+\d{3}-\d{7,8}$/, 'auth.phone.format' as AdminLang),
        email: yup
            .string()
            .required('auth.email.required' as AdminLang)
            .email('auth.email.format' as AdminLang),
        password: yup
            .string()
            .required('auth.password.required' as AdminLang)
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, 'auth.password.format'),
        repeat_password: yup
            .string()
            .required('auth.repeatpassword.required' as AdminLang)
            .oneOf([yup.ref('password')], 'auth.repeatpassword.equal' as AdminLang),
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

    const { translate } = useAdminLang();

    const navigate = useNavigate();

    /* functions */
    const handleCreateTenant = handleSubmit(async data => {
        showLoader();

        const service = await createTenantService({
            schemaName: data.schema,
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
            placeholder: translate('createorg.schema.placeholder'),
            ...register('schema'),
        },
        isHintReserved: true,
        hint: errors.schema
            ? {
                  children: translate(errors.schema.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.schema.message as AdminLang),
              }
            : {
                  children: translate('createorg.schema.hint'),
                  hasDots: true,
                  title: translate('createorg.schema.hint'),
              },
    };

    const nameProps: FieldSetProps = {
        field: {
            className: errors.name ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: translate('createorg.name.placeholder'),
            ...register('name'),
        },
        isHintReserved: true,
        hint: errors.name
            ? {
                  children: translate(errors.name.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.name.message as AdminLang),
              }
            : {
                  children: translate('createorg.name.hint'),
                  hasDots: true,
                  title: translate('createorg.name.hint'),
              },
    };

    const phoneProps: FieldSetProps = {
        field: {
            className: errors.phone ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: translate('auth.phone.placeholder'),
            ...register('phone'),
        },
        isHintReserved: true,
        hint: errors.phone
            ? {
                  children: translate(errors.phone.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.phone.message as AdminLang),
              }
            : {
                  children: translate('auth.phone.hint'),
                  hasDots: true,
                  title: translate('auth.phone.hint'),
              },
    };

    const GenerateEmailBySchema = () => (
        <Button type="button" onClick={handleGenerateEmailBySchema} title={translate('createorg.email.generate')}>
            <i>
                <MdAlternateEmail />
            </i>
        </Button>
    );

    const emailProps: FieldSetProps = {
        field: {
            className: errors.email ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'email',
            placeholder: translate('auth.email.placeholder'),
            ...register('email'),
            afterContent: <GenerateEmailBySchema />,
        },
        isHintReserved: true,
        hint: errors.email
            ? {
                  children: translate(errors.email.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.email.message as AdminLang),
              }
            : {
                  children: translate('createorg.email.hint'),
                  hasDots: true,
                  title: translate('createorg.email.hint'),
              },
    };

    const passwordProps: FieldSetProps = {
        field: {
            className: errors.password ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'password',
            placeholder: translate('auth.password.placeholder'),
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
                  children: translate(errors.password.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.password.message as AdminLang),
              }
            : {
                  children: translate('auth.password.hint'),
                  hasDots: true,
                  title: translate('auth.password.hint'),
              },
    };

    const repeatPasswordProps: FieldSetProps = {
        field: {
            className:
                errors.password || errors.repeat_password ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'password',
            placeholder: translate('auth.repeatpassword.placeholder'),
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
                  children: translate(errors.repeat_password.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.repeat_password.message as AdminLang),
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
