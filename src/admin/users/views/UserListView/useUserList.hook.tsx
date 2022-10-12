/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useOutlet } from 'react-router-dom';
/* props */
import { UserListContextProps } from './UserList.props';
/* hooks */
import { useActive, useKeyDownEvent, useLoader, useMinWidth } from 'shared/hooks';
import { FieldSetProps, useAdminNotify } from 'admin/core';
/* services */
import { userListService } from 'admin/users/services';
/* utils */
import { isDate, parse } from 'date-fns';
import { isAfterOrEqual, isBeforeOrEqual, matchBreakPoint } from 'shared/utils';
/* types */
import { Profile, ProfileValue } from 'admin/auth';
import { UserListItemDTO, UserState } from 'admin/users/types';
/* assets */
import { MdCheckCircle, MdDangerous } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';

interface UserListFilterForm {
    name: string;
    profile: Profile | '';
    state: UserState | '';
    fromDate: Date;
    toDate: Date;
}

export const useUserList = () => {
    /* states */
    const { handleSubmit, reset, register } = useForm<UserListFilterForm>();

    const [users, setUsers] = useState<UserListItemDTO[]>([]);

    const [filter, setFilter] = useState<UserListFilterForm | null>(null);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const [bp] = useMinWidth();

    const [isDropFilter, showDropFilter, hideDropFilter] = useActive();

    useKeyDownEvent(event => event.key === 'Escape' && hideDropFilter());

    const isBreakPoint = useMemo(() => matchBreakPoint('md', bp).on, [bp]);

    const outlet = useOutlet();

    const { t } = useTranslation();

    const userList = useMemo(() => {
        let list = users.slice();

        if (filter?.name)
            list = list.filter(
                user =>
                    user.fullname.toLowerCase().includes(filter.name.toLowerCase()) ||
                    user.email.toLowerCase().includes(filter.name.toLowerCase()) ||
                    user.phoneNumber.toLowerCase().includes(filter.name.toLowerCase())
            );

        if (filter?.state) list = list.filter(user => user.isActive === filter.state);

        if (filter?.profile) list = list.filter(user => user.profileName === filter.profile);

        if (isDate(filter?.fromDate))
            list = list.filter(user => isAfterOrEqual(user.createdAt, filter?.fromDate as Date));

        if (isDate(filter?.toDate)) list = list.filter(user => isBeforeOrEqual(user.createdAt, filter?.toDate as Date));

        return list;
    }, [users, filter]);

    /* functions */
    const handleFilter = handleSubmit(data => {
        const values = { ...data };

        if (data.fromDate) values.fromDate = parse(data.fromDate.toString(), 'yyyy-MM-dd', Date.now());
        if (data.toDate) values.toDate = parse(data.toDate.toString(), 'yyyy-MM-dd', Date.now());

        setFilter(values);

        hideDropFilter();
    });

    const handleResetFilter = () => {
        reset();

        setFilter(null);

        hideDropFilter();
    };

    const getUserList = useCallback(async () => {
        showLoader();

        const service = await userListService();

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

        setUsers(service.data);
    }, [hideLoader, notify, showLoader]);

    /* reactivity */
    useEffect(() => {
        if (!outlet) getUserList();
    }, [getUserList, outlet]);

    /* props */
    const nameField: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: t('views.userlist.filter.form.name.placeholder'),
            ...register('name'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            children: t('views.userlist.filter.form.name.hint'),
        },
    };
    const profileField: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'select',
            placeholder: t('views.userlist.filter.form.profile.placeholder'),
            options: [...Array(ProfileValue.length - 1)].map((_, index) => ({
                label: t(`profiles.${ProfileValue[index + 1].profile}`),
                value: ProfileValue[index + 1].profile,
            })),
            ...register('profile'),
        },
        isHintReserved: true,
        hint: {
            children: t('views.userlist.filter.form.profile.hint'),
            hasDots: true,
            title: t('views.userlist.filter.form.profile.hint'),
        },
    };
    const stateField: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'select',
            placeholder: t('views.userlist.filter.form.state.placeholder'),
            options: [
                {
                    label: t('views.userlist.filter.form.state.active'),
                    value: 'active',
                },
                {
                    label: t('views.userlist.filter.form.state.inactive'),
                    value: 'inactive',
                },
            ],
            ...register('state'),
        },
        isHintReserved: true,
        hint: {
            children: t('views.userlist.filter.form.state.hint'),
            hasDots: true,
            title: t('views.userlist.filter.form.state.hint'),
        },
    };
    const fromDateField: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: t('views.userlist.filter.form.fromdate.placeholder'),
            strategy: 'date',
            ...register('fromDate'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            children: t('views.userlist.filter.form.fromdate.hint'),
        },
    };
    const toDateField: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: t('views.userlist.filter.form.todate.placeholder'),
            strategy: 'date',
            ...register('toDate'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            children: t('views.userlist.filter.form.todate.hint'),
        },
    };

    const filterFormFields: FieldSetProps[] = [nameField, profileField, stateField, fromDateField, toDateField];

    /* context */
    const context: UserListContextProps = {
        /* states */
        userList,
        isDropFilter,
        showDropFilter,
        hideDropFilter,
        isBreakPoint,
        /* functions */
        handleFilter,
        handleResetFilter,
        /* props */
        filterFormFields,
    };

    return { context };
};
