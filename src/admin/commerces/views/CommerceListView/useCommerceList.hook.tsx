/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { CommerceListContextProps } from './CommerceList.props';
import { FieldSetProps, useAdminNotify } from 'admin/core';
/* services */
import { commerceListService } from 'admin/commerces/services';
/* hooks */
import { useActive, useKeyDownEvent, useLoader, useMinWidth } from 'shared/hooks';
/* utils */
import { isDate, parse } from 'date-fns';
import { isAfterOrEqual, isBeforeOrEqual, matchBreakPoint } from 'shared/utils';
/* types */
import { CommerceListItemDTO, CommerceState } from 'admin/commerces/types';
/* assets */
import { MdDangerous } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';

interface CommerceListFilterForm {
    name: string;
    state: CommerceState | '';
    fromDate: Date;
    toDate: Date;
}

export const useCommerceList = () => {
    /* states */
    const { handleSubmit, reset, register } = useForm<CommerceListFilterForm>();

    const [commerces, setCommerces] = useState<CommerceListItemDTO[]>([]);

    const [filter, setFilter] = useState<CommerceListFilterForm | null>(null);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const [bp] = useMinWidth();

    const [isDropFilter, showDropFilter, hideDropFilter] = useActive();

    useKeyDownEvent(event => event.key === 'Escape' && hideDropFilter());

    const isBreakPoint = useMemo(() => matchBreakPoint('md', bp).on, [bp]);

    const { t } = useTranslation();

    const commerceList = useMemo(() => {
        let list = commerces.slice();

        if (filter?.name)
            list = list.filter(commerce => commerce.name.toLowerCase().includes(filter.name.toLowerCase()));

        if (filter?.state) list = list.filter(commerce => commerce.isActive === filter.state);

        if (isDate(filter?.fromDate))
            list = list.filter(commerce => isAfterOrEqual(commerce.createdAt, filter?.fromDate as Date));

        if (isDate(filter?.toDate))
            list = list.filter(commerce => isBeforeOrEqual(commerce.createdAt, filter?.toDate as Date));

        return list;
    }, [commerces, filter]);

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
    const referenceNameField: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: t('views.commercelist.filter.form.referencename.placeholder'),
            ...register('name'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            children: t('views.commercelist.filter.form.referencename.hint'),
        },
    };

    const stateProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'select',
            placeholder: t('views.commercelist.filter.form.state.placeholder'),
            options: [
                {
                    label: t('views.commercelist.filter.form.state.active'),
                    value: 'active',
                },
                {
                    label: t('views.commercelist.filter.form.state.inactive'),
                    value: 'inactive',
                },
            ],
            ...register('state'),
        },
        isHintReserved: true,
        hint: {
            children: t('views.commercelist.filter.form.state.hint'),
            hasDots: true,
            title: t('views.commercelist.filter.form.state.hint'),
        },
    };

    const fromDateField: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: t('views.commercelist.filter.form.fromdate.placeholder'),
            strategy: 'date',
            ...register('fromDate'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            children: t('views.commercelist.filter.form.fromdate.hint'),
        },
    };

    const toDateField: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: t('views.commercelist.filter.form.todate.placeholder'),
            strategy: 'date',
            ...register('toDate'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            children: t('views.commercelist.filter.form.todate.hint'),
        },
    };

    const filterFormFields: FieldSetProps[] = [referenceNameField, stateProps, fromDateField, toDateField];

    /* context */
    const context: CommerceListContextProps = {
        /* states */
        commerceList,
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
