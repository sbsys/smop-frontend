/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
/* props */
import { CommerceListContextProps } from './CommerceList.props';
import { FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
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
    fromDate: Date | null;
    toDate: Date | null;
}

export const useCommerceList = () => {
    /* states */
    const { handleSubmit, setValue, register } = useForm<CommerceListFilterForm>();

    const [commerces, setCommerces] = useState<CommerceListItemDTO[]>([]);
    const [selectedCommerceToUpdateState, setSelectedCommerceToUpdateState] = useState<CommerceListItemDTO | null>(
        null
    );

    const [filter, setFilter] = useState<CommerceListFilterForm | null>(null);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const [bp] = useMinWidth();

    const [isDropFilter, showDropFilter, hideDropFilter] = useActive();

    useKeyDownEvent(event => event.key === 'Escape' && hideDropFilter());

    const isBreakPoint = useMemo(() => matchBreakPoint('md', bp).on, [bp]);

    const { translate } = useAdminLang();

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
        setValue('name', '');
        setValue('state', '');
        setValue('fromDate', null);
        setValue('toDate', null);

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

    const handleSelectCommerceToUpdateState = useCallback(
        (id: string) => {
            setSelectedCommerceToUpdateState(commerces.find(commerce => commerce.id === id) ?? null);
        },
        [commerces]
    );

    const handleUnselectCommerceToUpdateState = useCallback(() => setSelectedCommerceToUpdateState(null), []);

    /* reactivity */
    useEffect(() => {
        getCommerceList();
    }, [getCommerceList]);

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

    const stateProps: FieldSetProps = {
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

    const filterFormFields: FieldSetProps[] = [referenceNameField, stateProps, fromDateField, toDateField];

    /* context */
    const context: CommerceListContextProps = {
        /* states */
        commerceList,
        selectedCommerceToUpdateState,
        isDropFilter,
        showDropFilter,
        hideDropFilter,
        isBreakPoint,
        /* functions */
        getCommerceList,
        handleFilter,
        handleResetFilter,
        handleSelectCommerceToUpdateState,
        handleUnselectCommerceToUpdateState,
        /* props */
        filterFormFields,
    };

    return { context };
};
