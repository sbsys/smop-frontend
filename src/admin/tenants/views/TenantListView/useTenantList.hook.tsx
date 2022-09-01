/* react */
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
/* props */
import { TenantListContextProps } from './TenantList.props';
import { FieldSetProps } from 'admin/core';
/* hooks */
import { useLoader, useMinWidth } from 'shared/hooks';
/* utils */
import { matchBreakPoint } from 'shared/utils';
/* types */
import { TenantItemDTO } from 'admin/tenants/types';
/* styles */
import { FieldStyles } from 'shared/styles';

export const useTenantList = () => {
    /* states */
    const [tenantList, setTenantList] = useState<TenantItemDTO[]>([]);

    const [bp] = useMinWidth();
    const isInBreakPoint = useMemo(() => matchBreakPoint('md', bp).on && matchBreakPoint('xl', bp).under, [bp]);

    const {showLoader, hideLoader} = useLoader()

    const { t } = useTranslation();

    /* functions */
    const getTenantList = async () => {
        showLoader();

        await new Promise(resolve => setTimeout(() => resolve(null), 2000));

        hideLoader();

        setTenantList([
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
        ])
    }

    /* reactivity */
    useEffect(() => {getTenantList()}, [getTenantList])

    /* props */
    const textSearchProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: t('views.tenants.filter.schema.placeholder'),
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
        /* props */
        textSearchProps,
        stateSearchProps,
        startDateSearchProps,
        endDateSearchProps,
    };

    return { context };
};
