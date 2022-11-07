/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useOutlet } from 'react-router-dom';
/* props */
import { MainTitleListContextProps } from './MainTitleList.props';
/* hooks */
import { useActive, useKeyDownEvent, useLoader, useMinWidth } from 'shared/hooks';
import { FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
/* services */
import { mainTitleListService } from 'admin/collections/services';
/* utils */
import { isDate, parse } from 'date-fns';
import { isAfterOrEqual, isBeforeOrEqual, matchBreakPoint } from 'shared/utils';
import { MdDangerous } from 'react-icons/md';
/* types */
import { MainTitleListItemDTO, TitleState } from 'admin/collections/types';
/* styles */
import { FieldStyles } from 'shared/styles';

interface MainTitleListFilterForm {
    name: string;
    state: TitleState | '';
    fromDate: Date | null;
    toDate: Date | null;
}

export const useMainTitleList = () => {
    /* states */
    const { handleSubmit, register, setValue } = useForm<MainTitleListFilterForm>();

    const [titles, setTitles] = useState<MainTitleListItemDTO[]>([]);
    const [selectedTitle, setSelectedTitle] = useState<MainTitleListItemDTO | null>(null);
    const [selectedTitleToUpdate, setSelectedTitleToUpdate] = useState<MainTitleListItemDTO | null>(null);
    const [selectedTitleToUpdateState, setSelectedTitleToUpdateState] = useState<MainTitleListItemDTO | null>(null);

    const [filter, setFilter] = useState<MainTitleListFilterForm | null>(null);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const [bp] = useMinWidth();

    const [isDropFilter, showDropFilter, hideDropFilter] = useActive();

    useKeyDownEvent(event => event.key === 'Escape' && hideDropFilter());

    const isBreakPoint = useMemo(() => matchBreakPoint('md', bp).on, [bp]);

    const { translate } = useAdminLang();

    const mainTitleList = useMemo(() => {
        let list = titles.slice();

        if (filter?.name)
            list = list.filter(
                mainTitle =>
                    mainTitle.defaultTitle.toLowerCase().includes(filter.name.toLowerCase()) ||
                    mainTitle.titleCollection.reduce(
                        (prev, current) => prev || current.ref.toLowerCase().includes(filter.name.toLowerCase()),
                        false
                    )
            );

        if (filter?.state) list = list.filter(mainTitle => mainTitle.isActive === filter.state);

        if (isDate(filter?.fromDate))
            list = list.filter(mainTitle =>
                !mainTitle.createdAt ? true : isAfterOrEqual(mainTitle.createdAt, filter?.fromDate as Date)
            );

        if (isDate(filter?.toDate))
            list = list.filter(mainTitle =>
                !mainTitle.createdAt ? true : isBeforeOrEqual(mainTitle.createdAt, filter?.toDate as Date)
            );

        return list;
    }, [titles, filter]);

    const outlet = useOutlet();

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

    const getTitleList = useCallback(async () => {
        showLoader();

        const service = await mainTitleListService();

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setTitles(service.data);
    }, [hideLoader, notify, showLoader]);

    const handleSelectTitle = useCallback(
        (id: number) => {
            setSelectedTitle(titles.find(title => title.titleId === id) ?? null);
        },
        [titles]
    );

    const handleUnselectTitle = useCallback(() => setSelectedTitle(null), []);

    const handleSelectTitleToUpdate = useCallback(
        (id: number) => {
            setSelectedTitleToUpdate(titles.find(title => title.titleId === id) ?? null);
        },
        [titles]
    );

    const handleUnselectTitleToUpdate = useCallback(() => setSelectedTitleToUpdate(null), []);

    const handleSelectTitleToUpdateState = useCallback(
        (id: number) => {
            setSelectedTitleToUpdateState(titles.find(title => title.titleId === id) ?? null);
        },
        [titles]
    );

    const handleUnselectTitleToUpdateState = useCallback(() => setSelectedTitleToUpdateState(null), []);

    /* reactivity */
    useEffect(() => {
        if (outlet === null) getTitleList();
    }, [getTitleList, outlet]);

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
    const context: MainTitleListContextProps = {
        /* states */
        mainTitleList,
        selectedTitle,
        selectedTitleToUpdate,
        selectedTitleToUpdateState,
        isDropFilter,
        showDropFilter,
        hideDropFilter,
        isBreakPoint,
        /* functions */
        handleFilter,
        handleResetFilter,
        getTitleList,
        handleSelectTitle,
        handleUnselectTitle,
        handleSelectTitleToUpdate,
        handleUnselectTitleToUpdate,
        handleSelectTitleToUpdateState,
        handleUnselectTitleToUpdateState,
        /* props */
        filterFormFields,
    };

    return { context };
};
