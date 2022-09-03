/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { TenantListContextProps } from './TenantList.props';
import { FieldSetProps } from 'admin/core';
/* hooks */
import { useLoader, useMinWidth } from 'shared/hooks';
/* utils */
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

export const useTenantList = () => {
    /* states */
    const [tenants, setTenants] = useState<TenantItemDTO[]>([]);
    const [currentFilter, setCurrentFilter] = useState<FilterForm>(filterFormInitialState);

    const { register, handleSubmit } = useForm<FilterForm>();

    const [bp] = useMinWidth();
    const isInBreakPoint = useMemo(() => matchBreakPoint('md', bp).on && matchBreakPoint('xl', bp).under, [bp]);

    const { showLoader, hideLoader } = useLoader();

    const { t } = useTranslation();

    const tenantList = useMemo(() => {
        let list = tenants;

        if (currentFilter.schema)
            list = list.filter(currentTenant =>
                currentTenant.schema.toLocaleLowerCase().includes(currentFilter.schema.toLocaleLowerCase())
            );

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
                created: new Date('2020-08-30'),
                state: 'active',
            },
            {
                id: 2,
                schema: 'primas',
                email: 'admin@primas.com',
                phone: '+505-77553311',
                created: new Date('2021-02-27'),
                state: 'inactive',
            },
        ]);
    }, [hideLoader, showLoader]);

    const handleFilter = handleSubmit(async data => {
        setCurrentFilter({ ...data });

        console.log(data);
    });

    const handleResetFilter = () => setCurrentFilter(filterFormInitialState);

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
        tenantList,
        isInBreakPoint,
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
