/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
/* props */
import { TenantApiManagementContextProps } from './TenantApiManagement.props';
/* hoooks */
import { useActive, useKeyDownEvent, useLoader, useMinWidth } from 'shared/hooks';
import { FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
/* services */
import { gatewayListService } from 'admin/tenants/services';
/* utils */
import { isDate, parse } from 'date-fns';
import { isAfterOrEqual, isBeforeOrEqual, matchBreakPoint } from 'shared/utils';
/* types */
import { GatewayListItem } from 'admin/tenants/types';
/* assets */
import { MdDangerous } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';

interface TenantApiManagementFilterForm {
    name: string;
    fromDate: Date | null;
    toDate: Date | null;
}

export const useTenantApiManagement = () => {
    /* states */
    const { handleSubmit, register, reset } = useForm<TenantApiManagementFilterForm>();

    const [keys, setKeys] = useState<GatewayListItem[]>([]);

    const [filter, setFilter] = useState<TenantApiManagementFilterForm | null>(null);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const [bp] = useMinWidth();

    const [isDropFilter, showDropFilter, hideDropFilter] = useActive();

    useKeyDownEvent(event => event.key === 'Escape' && hideDropFilter());

    const isBreakPoint = useMemo(() => matchBreakPoint('md', bp).on, [bp]);

    const { translate } = useAdminLang();

    const keyList = useMemo(() => {
        let list = keys.slice();

        if (filter?.name) list = list.filter(key => key.referenceKey.toLowerCase().includes(filter.name.toLowerCase()));

        if (isDate(filter?.fromDate))
            list = list.filter(key =>
                !key.createdAt ? true : isAfterOrEqual(key.createdAt, filter?.fromDate as Date)
            );

        if (isDate(filter?.toDate))
            list = list.filter(key => (!key.createdAt ? true : isBeforeOrEqual(key.createdAt, filter?.toDate as Date)));

        return list;
    }, [keys, filter]);

    /* functions */
    const handleFilter = handleSubmit(data => {
        const values = { ...data };

        if (data.fromDate) values.fromDate = parse(data.fromDate.toString(), 'yyyy-MM-dd', Date.now());
        if (data.toDate) values.toDate = parse(data.toDate.toString(), 'yyyy-MM-dd', Date.now());

        setFilter(values);

        hideDropFilter();
    });

    const handleResetFilter = () => {
        reset({
            name: '',
            fromDate: null,
            toDate: null,
        });

        setFilter(null);

        hideDropFilter();
    };

    const getKeyList = useCallback(async () => {
        showLoader();

        const service = await gatewayListService();

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setKeys(service.data);
    }, [hideLoader, notify, showLoader]);

    /* reactivity */
    useEffect(() => {
        getKeyList();
    }, [getKeyList]);

    /* props */
    const referenceNameField: FieldSetProps = {
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

    const filterFormFields: FieldSetProps[] = [referenceNameField, fromDateField, toDateField];

    /* context */
    const context: TenantApiManagementContextProps = {
        /* states */
        keyList,
        isDropFilter,
        showDropFilter,
        hideDropFilter,
        isBreakPoint,
        /* functions */
        handleFilter,
        handleResetFilter,
        getKeyList,
        /* props */
        filterFormFields,
    };

    return { context };
};
