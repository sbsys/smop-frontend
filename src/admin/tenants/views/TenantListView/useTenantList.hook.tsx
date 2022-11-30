/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useOutlet } from 'react-router-dom';
/* props */
import { TenantListContextProps } from './TenantList.props';
import { FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
/* hooks */
import { useActive, useKeyDownEvent, useLoader, useMinWidth } from 'shared/hooks';
/* utils */
import { isDate, parse } from 'date-fns';
import { isAfterOrEqual, isBeforeOrEqual, matchBreakPoint } from 'shared/utils';
/* services */
import { tenantListService } from 'admin/tenants/services';
/* types */
import { TenantItemDTO, TenantState } from 'admin/tenants/types';
/* assets */
import { MdDangerous } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';

interface FilterForm {
    schema: string;
    state: TenantState | '';
    start_date: Date | null;
    end_date: Date | null;
}

const filterFormInitialState: FilterForm = {
    schema: '',
    state: '',
    start_date: null,
    end_date: null,
};

export const useTenantList = () => {
    /* states */
    const [tenants, setTenants] = useState<TenantItemDTO[]>([]);
    const [currentFilter, setCurrentFilter] = useState<FilterForm>(filterFormInitialState);

    const [bp] = useMinWidth();

    const [isDropFilter, showDropFilter, hideDropFilter] = useActive();

    useKeyDownEvent(event => event.key === 'Escape' && hideDropFilter());

    const isBreakPoint = useMemo(() => matchBreakPoint('md', bp).on, [bp]);

    const { register, handleSubmit, reset } = useForm<FilterForm>();

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { translate } = useAdminLang();

    const outlet = useOutlet();

    const tenantList = useMemo(() => {
        let list = tenants;

        if (currentFilter.schema)
            list = list.filter(
                currentTenant =>
                    currentTenant.schema.toLocaleLowerCase().includes(currentFilter.schema.toLocaleLowerCase()) ||
                    currentTenant.email.toLocaleLowerCase().includes(currentFilter.schema.toLocaleLowerCase()) ||
                    currentTenant.phone.toLocaleLowerCase().includes(currentFilter.schema.toLocaleLowerCase())
            );

        if (currentFilter.state !== '')
            list = list.filter(currentTenant => currentTenant.state === currentFilter.state);

        if (isDate(currentFilter.start_date))
            list = list.filter(currentTenant =>
                isAfterOrEqual(currentTenant.created, currentFilter.start_date as Date)
            );

        if (isDate(currentFilter.end_date))
            list = list.filter(currentTenant => isBeforeOrEqual(currentTenant.created, currentFilter.end_date as Date));

        return list;
    }, [tenants, currentFilter]);

    /* functions */
    const getTenantList = useCallback(async () => {
        showLoader();

        const service = await tenantListService();

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setTenants(service.data);
    }, [hideLoader, notify, showLoader]);

    const handleFilter = handleSubmit(data => {
        const values = { ...data };

        if (data.start_date) values.start_date = parse(data.start_date.toString(), 'yyyy-MM-dd', Date.now());
        if (data.end_date) values.end_date = parse(data.end_date.toString(), 'yyyy-MM-dd', Date.now());

        setCurrentFilter(values);
    });

    const handleResetFilter = () => {
        setCurrentFilter(filterFormInitialState);

        reset(filterFormInitialState);
    };

    /* reactivity */
    useEffect(() => {
        if (!outlet) getTenantList();
    }, [getTenantList, outlet]);

    /* props */
    const textSearchProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: translate('filter.name'),
            ...register('schema'),
        },
        isHintReserved: true,
        hint: {
            children: translate('filter.name'),
            hasDots: true,
            title: translate('filter.name'),
        },
    };

    const stateSearchProps: FieldSetProps = {
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

    const startDateSearchProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'date',
            placeholder: translate('filter.fromdate'),
            ...register('start_date'),
        },
        isHintReserved: true,
        hint: {
            children: translate('filter.fromdate'),
            hasDots: true,
            title: translate('filter.fromdate'),
        },
    };

    const endDateSearchProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'date',
            placeholder: translate('filter.todate'),
            ...register('end_date'),
        },
        isHintReserved: true,
        hint: {
            children: translate('filter.todate'),
            hasDots: true,
            title: translate('filter.todate'),
        },
    };

    /* context */
    const context: TenantListContextProps = {
        /* states */
        isDropFilter,
        showDropFilter,
        hideDropFilter,
        isBreakPoint,
        tenantList,
        /* functions */
        handleFilter,
        handleResetFilter,
        /* props */
        textSearchProps,
        stateSearchProps,
        startDateSearchProps,
        endDateSearchProps,
    };

    return { context };
};
