/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { TenantListContextProps } from './TenantList.props';
import { FieldSetProps } from 'admin/core';
/* hooks */
import { useActive, useKeyDownEvent, useLoader, useMinWidth } from 'shared/hooks';
/* utils */
import { isAfter, isBefore, isDate, isEqual, parse } from 'date-fns';
import { matchBreakPoint } from 'shared/utils';
/* types */
import { TenantItemDTO, TenantState } from 'admin/tenants/types';
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

const isAfterOrEqual = (evaluate: Date, base: Date) => isAfter(evaluate, base) || isEqual(evaluate, base);
const isBeforeOrEqual = (evaluate: Date, base: Date) => isBefore(evaluate, base) || isEqual(evaluate, base);

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

    const { t } = useTranslation();

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

        await new Promise(resolve => setTimeout(() => resolve(null), 2000));

        hideLoader();

        setTenants([
            {
                id: 1,
                schema: 'churrascos',
                email: 'admin@churrascos.com',
                phone: '+505-88664422',
                created: parse('2020-08-30', 'yyyy-MM-dd', Date.now()),
                state: 'active',
            },
            {
                id: 2,
                schema: 'primas',
                email: 'admin@primas.com',
                phone: '+505-77553311',
                created: parse('2021-02-27', 'yyyy-MM-dd', Date.now()),
                state: 'inactive',
            },
        ]);
    }, [hideLoader, showLoader]);

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
        getTenantList();
    }, [getTenantList]);

    /* props */
    const textSearchProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: t('views.tenants.filter.schema.placeholder'),
            ...register('schema'),
        },
        isHintReserved: true,
        hint: {
            children: t('views.tenants.filter.schema.hint'),
            hasDots: true,
            title: t('views.tenants.filter.schema.hint'),
        },
    };

    const stateSearchProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'select',
            placeholder: t('views.tenants.filter.state.placeholder'),
            options: [
                {
                    label: t('views.tenants.filter.state.states.active'),
                    value: 'active',
                },
                {
                    label: t('views.tenants.filter.state.states.inactive'),
                    value: 'inactive',
                },
            ],
            ...register('state'),
        },
        isHintReserved: true,
        hint: {
            children: t('views.tenants.filter.state.hint'),
            hasDots: true,
            title: t('views.tenants.filter.state.hint'),
        },
    };

    const startDateSearchProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'date',
            placeholder: t('views.tenants.filter.start.placeholder'),
            ...register('start_date'),
        },
        isHintReserved: true,
        hint: {
            children: t('views.tenants.filter.start.hint'),
            hasDots: true,
            title: t('views.tenants.filter.start.hint'),
        },
    };

    const endDateSearchProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'date',
            placeholder: t('views.tenants.filter.end.placeholder'),
            ...register('end_date'),
        },
        isHintReserved: true,
        hint: {
            children: t('views.tenants.filter.end.hint'),
            hasDots: true,
            title: t('views.tenants.filter.end.hint'),
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
