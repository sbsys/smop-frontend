/* react */
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* context */
import { useUserListContext } from '../UserList.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { FieldSetProps, useAdminNotify } from 'admin/core';
/* services */
import { CommerceListItemDTO, commerceListService } from 'admin/commerces';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* types */
import { ProfileValue } from 'admin/auth';
/* assets */
import { MdCheckCircle, MdDangerous } from 'react-icons/md';
import { FieldStyles } from 'shared/styles';
import { linkUserService } from 'admin/users/services';

interface UpdateUserLinkForm {
    profile: number;
    commerce: string;
}

const UpdateUserLinkSchema = yup
    .object({
        profile: yup.number().required('views.userlist.link.form.profile.required'),
        commerce: yup.string().required('views.userlist.link.form.commerce.required'),
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
    } = useForm<UpdateUserLinkForm>({
        mode: 'all',
        resolver: yupResolver(UpdateUserLinkSchema),
    });

    const [commerces, setCommerces] = useState<CommerceListItemDTO[]>([]);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { t } = useTranslation();

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

        notify('success', {
            title: 'Success',
            icon: <MdCheckCircle />,
            text: service.message,
            timestamp: new Date(),
        });

        setCommerces(service.data);
    }, [hideLoader, notify, selectedUserToLink, showLoader]);

    /* reactivity */
    useEffect(() => {
        getCommerceList();
    }, [getCommerceList]);

    /* props */
    const profileField: FieldSetProps = {
        field: {
            className: errors.profile ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'select',
            placeholder: t('views.userlist.link.form.profile.placeholder'),
            options: [...Array(ProfileValue.length - 2)].map((_, index) => ({
                label: t(`profiles.${ProfileValue[index + 2].profile}`),
                value: ProfileValue[index + 2].id,
            })),
            defaultValue: ProfileValue.find(value => value.profile === selectedUserToLink?.profileName)?.id,
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
                  children: t('views.userlist.link.form.profile.hint'),
                  hasDots: true,
                  title: t('views.userlist.link.form.profile.hint'),
              },
    };
    const commerceField: FieldSetProps = {
        field: {
            className: errors.commerce ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'select',
            placeholder: t('views.userlist.link.form.commerce.placeholder'),
            options: commerces.map(commerce => ({
                label: commerce.name,
                value: commerce.id,
            })),
            defaultValue: selectedUserToLink?.commerceId,
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
                  children: t('views.userlist.link.form.commerce.hint'),
                  hasDots: true,
                  title: t('views.userlist.link.form.commerce.hint'),
              },
    };

    const updateUserLinkFieldProps: FieldSetProps[] = [profileField, commerceField];

    return { handleUpdateLink, handleCancelUpdateLink, updateUserLinkFieldProps };
};
