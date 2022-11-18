/* react */
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
/* context */
import { useUserListContext } from '../UserList.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { AdminLang, FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
/* services */
import { CommerceListItemDTO, commerceListService } from 'admin/commerces';
import { linkUserService, unlinkUserService } from 'admin/users/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* types */
import { ProfileValue } from 'admin/auth';
/* assets */
import { MdCheckCircle, MdDangerous } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';

interface UpdateUserLinkForm {
    profile: number;
    commerce: string;
}

const UpdateUserLinkSchema = yup
    .object({
        profile: yup.number().typeError('auth.profile.required').required('auth.profile.required'),
        commerce: yup.string().required('auth.commerce.required'),
    })
    .required();

export const useUserListLinkModal = () => {
    /* states */
    const {
        /* states */
        selectedUserToLink,
        /* functions */
        getUserList,
        handleUnselectUserToLink,
    } = useUserListContext();

    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
        setValue,
    } = useForm<UpdateUserLinkForm>({
        mode: 'all',
        resolver: yupResolver(UpdateUserLinkSchema),
    });

    const [commerces, setCommerces] = useState<CommerceListItemDTO[]>([]);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { translate } = useAdminLang();

    /* functions */
    const handleCancelUpdateLink = () => {
        reset();

        handleUnselectUserToLink();
    };

    const handleUpdateLink = handleSubmit(async data => {
        showLoader();

        const service = await linkUserService(selectedUserToLink?.commerceId ? true : false, {
            commerceId: data.commerce,
            profileId: data.profile,
            userId: selectedUserToLink?.userId as string,
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
            title: 'Success',
            icon: <MdCheckCircle />,
            text: service.message,
            timestamp: new Date(),
        });

        handleCancelUpdateLink();

        getUserList();
    });

    const handleUnlink = async () => {
        showLoader();

        const service = await unlinkUserService({
            commerceId: selectedUserToLink?.commerceId ?? '',
            userId: selectedUserToLink?.userId ?? '',
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
            title: 'Success',
            icon: <MdCheckCircle />,
            text: service.message,
            timestamp: new Date(),
        });

        handleCancelUpdateLink();

        getUserList();
    };

    const getCommerceList = useCallback(async () => {
        if (selectedUserToLink === null) return;

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
    }, [hideLoader, notify, selectedUserToLink, showLoader]);

    /* reactivity */
    useEffect(() => {
        getCommerceList();
    }, [getCommerceList]);

    useEffect(() => {
        if (commerces.length > 0 && selectedUserToLink !== null)
            setValue('commerce', selectedUserToLink?.commerceId ?? '');
    }, [commerces, selectedUserToLink, selectedUserToLink?.commerceId, setValue]);

    /* props */
    const profileField: FieldSetProps = {
        field: {
            className: errors.profile ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'select',
            placeholder: translate('auth.profile.placeholder'),
            options: [...Array(ProfileValue.length - 2)].map((_, index) => ({
                label: translate(`profiles.${ProfileValue[index + 2].profile}`),
                value: ProfileValue[index + 2].id,
            })),
            defaultValue: ProfileValue.find(value => value.profile === selectedUserToLink?.profileName)?.id,
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

    const updateUserLinkFieldProps: FieldSetProps[] = [profileField, commerceField];

    return { handleUpdateLink, handleCancelUpdateLink, handleUnlink, updateUserLinkFieldProps };
};
