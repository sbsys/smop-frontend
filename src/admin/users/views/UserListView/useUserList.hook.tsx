/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useOutlet } from 'react-router-dom';
/* props */
import { UserListContextProps } from './UserList.props';
/* hooks */
import { useActive, useKeyDownEvent, useLoader, useMinWidth } from 'shared/hooks';
import { FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
/* services */
import { userListService } from 'admin/users/services';
/* utils */
import { isDate, parse } from 'date-fns';
import { isAfterOrEqual, isBeforeOrEqual, matchBreakPoint } from 'shared/utils';
/* types */
import { Profile, ProfileValue } from 'admin/auth';
import { UserListItemDTO, UserState } from 'admin/users/types';
/* assets */
import { MdDangerous } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';

interface UserListFilterForm {
    name: string;
    profile: Profile | '';
    state: UserState | '';
    fromDate: Date | null;
    toDate: Date | null;
}

export const useUserList = () => {
    /* states */
    const { handleSubmit, setValue, register } = useForm<UserListFilterForm>();

    const [users, setUsers] = useState<UserListItemDTO[]>([]);
    const [selectedUserToUpdateState, setSelectedUserToUpdateState] = useState<UserListItemDTO | null>(null);
    const [selectedUserToLink, setSelectedUserToLink] = useState<UserListItemDTO | null>(null);

    const [filter, setFilter] = useState<UserListFilterForm | null>(null);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const [bp] = useMinWidth();

    const [isDropFilter, showDropFilter, hideDropFilter] = useActive();

    useKeyDownEvent(event => event.key === 'Escape' && hideDropFilter());

    const isBreakPoint = useMemo(() => matchBreakPoint('md', bp).on, [bp]);

    const outlet = useOutlet();

    const { translate } = useAdminLang();

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
        setValue('name', '');
        setValue('profile', '');
        setValue('state', '');
        setValue('fromDate', null);
        setValue('toDate', null);

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

        setUsers(service.data);
    }, [hideLoader, notify, showLoader]);

    const handleSelectUserToUpdateState = useCallback(
        (id: string) => {
            setSelectedUserToUpdateState(users.find(user => user.userId === id) ?? null);
        },
        [users]
    );

    const handleUnselectUserToUpdateState = useCallback(() => setSelectedUserToUpdateState(null), []);

    const handleSelectUserToLink = useCallback(
        (id: string) => {
            setSelectedUserToLink(users.find(user => user.userId === id) ?? null);
        },
        [users]
    );

    const handleUnselectUserToLink = useCallback(() => setSelectedUserToLink(null), []);

    /* reactivity */
    useEffect(() => {
        if (!outlet) getUserList();
    }, [getUserList, outlet]);

    /* props */
    const nameField: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: translate('filter.name'),
            ...register('name'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            children: translate('filter.name'),
        },
    };
    const profileField: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'select',
            placeholder: translate('filter.profile'),
            options: [...Array(ProfileValue.length - 1)].map((_, index) => ({
                label: translate(`profiles.${ProfileValue[index + 1].profile}`),
                value: ProfileValue[index + 1].profile,
            })),
            ...register('profile'),
        },
        isHintReserved: true,
        hint: {
            children: translate('filter.profile'),
            hasDots: true,
            title: translate('filter.profile'),
        },
    };
    const stateField: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'select',
            placeholder: translate('filter.status'),
            options: [
                {
                    label: translate('status.active'),
                    value: 'active',
                },
                {
                    label: translate('status.inactive'),
                    value: 'inactive',
                },
            ],
            ...register('state'),
        },
        isHintReserved: true,
        hint: {
            children: translate('filter.status'),
            hasDots: true,
            title: translate('filter.status'),
        },
    };
    const fromDateField: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: translate('filter.fromdate'),
            strategy: 'date',
            ...register('fromDate'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            children: translate('filter.fromdate'),
        },
    };
    const toDateField: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: translate('filter.todate'),
            strategy: 'date',
            ...register('toDate'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            children: translate('filter.todate'),
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
        selectedUserToUpdateState,
        selectedUserToLink,
        /* functions */
        getUserList,
        handleFilter,
        handleResetFilter,
        handleSelectUserToUpdateState,
        handleUnselectUserToUpdateState,
        handleSelectUserToLink,
        handleUnselectUserToLink,
        /* props */
        filterFormFields,
    };

    return { context };
};
