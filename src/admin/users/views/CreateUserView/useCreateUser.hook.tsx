/* react */
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
/* props */
import { CreateUserContextProps } from './CreateUser.props';
/* hooks */
import { useActive, useLoader } from 'shared/hooks';
import { AdminLang, FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
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
        name: yup.string().required('auth.name.required'),
        phone: yup
            .string()
            .required('auth.phone.required')
            .matches(/^\+\d{3}-\d{7,8}$/, 'auth.phone.format'),
        email: yup.string().required('auth.email.required').email('auth.email.format'),
        password: yup
            .string()
            .required('auth.password.required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, 'auth.password.format'),
        repeat_password: yup
            .string()
            .required('auth.repeatpassword.required')
            .oneOf([yup.ref('password')], 'auth.repeatpassword.equal'),
        linked: yup.boolean(),
        profile: yup.mixed().when(['linked'], {
            is: (linked: boolean) => linked,
            then: yup.number().typeError('auth.profile.required').required('auth.profile.required'),
            otherwise: yup.string(),
        }),
        commerce: yup.mixed().when(['linked'], {
            is: (linked: boolean) => linked,
            then: yup.string().typeError('auth.commerce.required').required('auth.commerce.required'),
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

    const { translate } = useAdminLang();

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
            placeholder: translate('auth.name.placeholder'),
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
                  children: translate('auth.name.hint'),
                  hasDots: true,
                  title: translate('auth.name.hint'),
              },
    };
    const phoneField: FieldSetProps = {
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
    const emailField: FieldSetProps = {
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
            : {
                  children: translate('auth.email.hint'),
                  hasDots: true,
                  title: translate('auth.email.hint'),
              },
    };
    const passwordField: FieldSetProps = {
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
    const repeatPasswordField: FieldSetProps = {
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
            : {
                  children: translate('auth.password.format'),
                  hasDots: true,
                  title: translate('auth.password.format'),
              },
    };
    const linkedField: FieldSetProps = {
        field: {
            strategy: 'checkbox',
            defaultChecked: false,
            ...register('linked'),
        },
        isHintReserved: true,
        hint: {
            children: translate('createuser.linked.hint'),
            hasDots: true,
            title: translate('createuser.linked.hint'),
        },
    };
    const profileField: FieldSetProps = {
        field: {
            className: errors.profile ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'select',
            placeholder: translate('auth.profile.placeholder'),
            options: [...Array(ProfileValue.length - 2)].map((_, index) => ({
                label: translate(`profiles.${ProfileValue[index + 2].profile}`),
                value: ProfileValue[index + 2].id,
            })),
            ...register('profile'),
        },
        isHintReserved: true,
        hint: errors.profile
            ? {
                  children: translate(errors.profile.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.profile.message as AdminLang),
              }
            : {
                  children: translate('auth.profile.hint'),
                  hasDots: true,
                  title: translate('auth.profile.hint'),
              },
    };
    const commerceField: FieldSetProps = {
        field: {
            className: errors.commerce ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'select',
            placeholder: translate('auth.commerce.placeholder'),
            options: commerces.map(commerce => ({
                label: `${commerce.isActive === 'inactive' ? '(inactive) ' : ''}${commerce.name}`,
                value: commerce.id,
            })),
            ...register('commerce'),
        },
        isHintReserved: true,
        hint: errors.commerce
            ? {
                  children: translate(errors.commerce.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.commerce.message as AdminLang),
              }
            : {
                  children: translate('auth.commerce.hint'),
                  hasDots: true,
                  title: translate('auth.commerce.hint'),
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
