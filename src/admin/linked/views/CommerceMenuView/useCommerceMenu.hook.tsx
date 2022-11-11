/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
/* props */
import { CommerceMenuContextProps } from './CommerceMenu.props';
/* context */
import { useCommerceManagementContext } from '../CommerceManagementView';
/* hooks */
import { useActive, useKeyDownEvent, useLoader, useMinWidth } from 'shared/hooks';
import { FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
/* services */
import { menuLinkedListService } from 'admin/linked/services';
/* utils */
import { matchBreakPoint } from 'shared/utils';
/* types */
import { MenuLinkedListItemDTO } from 'admin/linked/types';
/* assets */
import { MdDangerous } from 'react-icons/md';
import { TitleState } from 'admin/collections';

interface CommerceMenuFilterForm {
    name: string;
    isActive: TitleState | '';
}

export const useCommerceMenu = () => {
    /* states */
    const {
        /* states */
        linkedCommerceSettings,
    } = useCommerceManagementContext();

    const { handleSubmit, setValue, register } = useForm<CommerceMenuFilterForm>();

    const [linkedTitles, setLinkedTitles] = useState<MenuLinkedListItemDTO[]>([]);

    const [filter, setFilter] = useState<CommerceMenuFilterForm | null>(null);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const [bp] = useMinWidth();

    const [isDropFilter, showDropFilter, hideDropFilter] = useActive();

    useKeyDownEvent(event => event.key === 'Escape' && hideDropFilter());

    const isBreakPoint = useMemo(() => matchBreakPoint('md', bp).on, [bp]);

    const { translate } = useAdminLang();

    const linkedTitleList = useMemo(() => {
        let list = linkedTitles.slice();
        console.log(filter);

        /* if (filter?.name)
            list = list.filter(commerce => commerce.name.toLowerCase().includes(filter.name.toLowerCase()));

        if (filter?.state) list = list.filter(commerce => commerce.isActive === filter.state);

        if (isDate(filter?.fromDate))
            list = list.filter(commerce => isAfterOrEqual(commerce.createdAt, filter?.fromDate as Date));

        if (isDate(filter?.toDate))
            list = list.filter(commerce => isBeforeOrEqual(commerce.createdAt, filter?.toDate as Date)); */

        return list;
    }, [linkedTitles, filter]);

    /* functions */
    const handleFilter = handleSubmit(data => {
        const values = { ...data };

        /* if (data.fromDate) values.fromDate = parse(data.fromDate.toString(), 'yyyy-MM-dd', Date.now());
        if (data.toDate) values.toDate = parse(data.toDate.toString(), 'yyyy-MM-dd', Date.now()); */

        setFilter(values);

        hideDropFilter();
    });

    const handleResetFilter = () => {
        setValue('name', '');
        setValue('isActive', '');

        setFilter(null);

        hideDropFilter();
    };

    const getMenuLinkedList = useCallback(async () => {
        showLoader();

        const service = await menuLinkedListService(linkedCommerceSettings?.commerceId ?? '');

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setLinkedTitles(service.data);
    }, [hideLoader, linkedCommerceSettings?.commerceId, notify, showLoader]);

    /* reactivity */
    useEffect(() => {
        getMenuLinkedList();
    }, [getMenuLinkedList]);

    /* props */
    const filterFormFields: FieldSetProps[] = [];

    /* context */
    const context: CommerceMenuContextProps = {
        /* states */
        linkedTitleList,
        isDropFilter,
        showDropFilter,
        hideDropFilter,
        isBreakPoint,
        /* functions */
        getMenuLinkedList,
        handleFilter,
        handleResetFilter,
        /* props */
        filterFormFields,
    };

    return { context };
};
