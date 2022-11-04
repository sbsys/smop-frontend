/* react */
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
/* props */
import { CreateUserContextProps } from './CreateUser.props';
/* hooks */
import { useActive, useLoader } from 'shared/hooks';
import { FieldSetProps, useAdminNotify } from 'admin/core';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* types */
import { ProfileValue } from 'admin/auth';
import { CommerceListItemDTO, commerceListService } from 'admin/commerces';
/* services */
import { createLinkedUserService, createUnlinkedUserService } from 'admin/users/services';
/* assets */
import { MdBookmarkAdded, MdDangerous } from 'react-icons/md';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
/* styles */
import { FieldStyles } from 'shared/styles';

interface CreateUserForm {
    name: string;
    phone: string;
    email: string;
    password: string;
    repeat_password: string;
    linked: boolean;
    profile: number;
    commerce: string;
}

const CreateUserSchema = yup
    .object({
        name: yup.string().required('views.createuser.form.name.required'),
        phone: yup
            .string()
            .required('views.createuser.form.phone.required')
            .matches(/^\+\d{3}-\d{7,8}$/, 'views.createuser.form.phone.format'),
        email: yup
            .string()
            .required('views.createuser.form.email.required')
            .email('views.createuser.form.email.format'),
        password: yup
            .string()
            .required('views.createuser.form.password.required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
                'views.createuser.form.password.format'
            ),
        repeat_password: yup
            .string()
            .required('views.createuser.form.repeatpassword.required')
            .oneOf([yup.ref('password')], 'views.createuser.form.repeatpassword.equal'),
        linked: yup.boolean(),
        profile: yup.mixed().when(['linked'], {
            is: (linked: boolean) => linked,
            then: yup
                .number()
                .typeError('views.createuser.form.profile.required')
                .required('views.createuser.form.profile.required'),
            otherwise: yup.string(),
        }),
        commerce: yup.mixed().when(['linked'], {
            is: (linked: boolean) => linked,
            then: yup
                .string()
                .typeError('views.createuser.form.commerce.required')
                .required('views.createuser.form.commerce.required'),
            otherwise: yup.string(),
        }),
    })
    .required();

export const useCreateUser = () => {
    /* states */
    const {
        formState: { errors },
        handleSubmit,
        register,
        watch,
    } = useForm<CreateUserForm>({
        mode: 'all',
        resolver: yupResolver(CreateUserSchema),
    });

    const [commerces, setCommerces] = useState<CommerceListItemDTO[]>([]);

    const [isPassword, showPassword, hidePassword] = useActive();

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { t } = useTranslation();

    const navigate = useNavigate();

    /* functions */
    const handleCreateUser = handleSubmit(async data => {
        showLoader();

        const service = await (watch('linked')
            ? createLinkedUserService({
                  fullname: data.name,
                  phoneNumber: data.phone,
                  email: data.email,
                  password: data.password,
                  profileId: data.profile,
                  commerceId: data.commerce,
              })
            : createUnlinkedUserService({
                  fullname: data.name,
                  phoneNumber: data.phone,
                  email: data.email,
                  password: data.password,
              }));

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

    const handleCalcelCreateUser = () => navigate(-1);

    const getCommerceList = useCallback(async () => {
        showLoader();

        const service = await commerceListService();

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setCommerces(service.data);
    }, [hideLoader, notify, showLoader]);

    /* reactivity */
    useEffect(() => {
        getCommerceList();
    }, [getCommerceList]);

    /* props */
    const nameField: FieldSetProps = {
        field: {
            className: errors.name ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: t('views.createuser.form.name.placeholder'),
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
                  children: t('views.createuser.form.name.hint'),
                  hasDots: true,
                  title: t('views.createuser.form.name.hint'),
              },
    };
    const phoneField: FieldSetProps = {
        field: {
            className: errors.phone ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: t('views.createuser.form.phone.placeholder'),
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
                  children: t('views.createuser.form.phone.hint'),
                  hasDots: true,
                  title: t('views.createuser.form.phone.hint'),
              },
    };
    const emailField: FieldSetProps = {
        field: {
            className: errors.email ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'email',
            placeholder: t('views.createuser.form.email.placeholder'),
            ...register('email'),
        },
        isHintReserved: true,
        hint: errors.email
            ? {
                  children: t(errors.email.message as string),
                  hasDots: true,
                  title: t(errors.email.message as string),
              }
            : {
                  children: t('views.createuser.form.email.hint'),
                  hasDots: true,
                  title: t('views.createuser.form.email.hint'),
              },
    };
    const passwordField: FieldSetProps = {
        field: {
            className: errors.password ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'password',
            placeholder: t('views.createuser.form.password.placeholder'),
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
                  children: t('views.createuser.form.password.hint'),
                  hasDots: true,
                  title: t('views.createuser.form.password.hint'),
              },
    };
    const repeatPasswordField: FieldSetProps = {
        field: {
            className:
                errors.password || errors.repeat_password ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'password',
            placeholder: t('views.createuser.form.repeatpassword.placeholder'),
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
            : {
                  children: t('views.createuser.form.repeatpassword.hint'),
                  hasDots: true,
                  title: t('views.createuser.form.repeatpassword.hint'),
              },
    };
    const linkedField: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            defaultChecked: false,
            ...register('linked'),
        },
        isHintReserved: true,
        hint: {
            children: t('views.createuser.form.linked.hint'),
            hasDots: true,
            title: t('views.createuser.form.linked.hint'),
        },
    };
    const profileField: FieldSetProps = {
        field: {
            className: errors.profile ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'select',
            placeholder: t('views.createuser.form.profile.placeholder'),
            options: [...Array(ProfileValue.length - 2)].map((_, index) => ({
                label: t(`profiles.${ProfileValue[index + 2].profile}`),
                value: ProfileValue[index + 2].id,
            })),
            ...register('profile'),
        },
        isHintReserved: true,
        hint: errors.profile
            ? {
                  children: t(errors.profile.message as string),
                  hasDots: true,
                  title: t(errors.profile.message as string),
              }
            : {
                  children: t('views.createuser.form.profile.hint'),
                  hasDots: true,
                  title: t('views.createuser.form.profile.hint'),
              },
    };
    const commerceField: FieldSetProps = {
        field: {
            className: errors.commerce ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'select',
            placeholder: t('views.createuser.form.commerce.placeholder'),
            options: commerces.map(commerce => ({
                label: `${commerce.isActive === 'inactive' ? '(inactive) ' : ''}${commerce.name}`,
                value: commerce.id,
            })),
            ...register('commerce'),
        },
        isHintReserved: true,
        hint: errors.commerce
            ? {
                  children: t(errors.commerce.message as string),
                  hasDots: true,
                  title: t(errors.commerce.message as string),
              }
            : {
                  children: t('views.createuser.form.commerce.hint'),
                  hasDots: true,
                  title: t('views.createuser.form.commerce.hint'),
              },
    };

    const createUserFieldProps: FieldSetProps[] = [
        nameField,
        phoneField,
        emailField,
        passwordField,
        repeatPasswordField,
        linkedField,
        ...(watch('linked') ? [profileField, commerceField] : []),
    ];

    /* context */
    const context: CreateUserContextProps = {
        /* states */
        /* functions */
        handleCreateUser,
        handleCalcelCreateUser,
        /* props */
        createUserFieldProps,
    };

    return { context };
};
