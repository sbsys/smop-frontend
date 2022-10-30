/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { ProductListContextProps } from './ProductList.props';
/* hooks */
import { useActive, useKeyDownEvent, useLoader, useMinWidth } from 'shared/hooks';
import { FieldSetProps, useAdminNotify } from 'admin/core';
/* utils */
import { isDate, parse } from 'date-fns';
import { isAfterOrEqual, isBeforeOrEqual, matchBreakPoint } from 'shared/utils';
/* services */
import { productListService } from 'admin/collections/services';
/* types */
import { ProductListItemDTO, ProductState } from 'admin/collections/types';
/* assets */
import { MdDangerous } from 'react-icons/md';
import { FieldStyles } from 'shared/styles';

interface ProductListFilterForm {
    name: string;
    state: ProductState | '';
    markAsAddon: 'addon' | '';
    fromDate: Date | null;
    toDate: Date | null;
}

export const useProductList = () => {
    /* states */
    const { handleSubmit, register, setValue } = useForm<ProductListFilterForm>();

    const [products, setProducts] = useState<ProductListItemDTO[]>([]);

    const [filter, setFilter] = useState<ProductListFilterForm | null>(null);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const [bp] = useMinWidth();

    const [isDropFilter, showDropFilter, hideDropFilter] = useActive();

    useKeyDownEvent(event => event.key === 'Escape' && hideDropFilter());

    const isBreakPoint = useMemo(() => matchBreakPoint('md', bp).on, [bp]);

    const { t } = useTranslation();

    const productList = useMemo(() => {
        let list = products.slice();

        if (filter?.name)
            list = list.filter(product => product.defaultReference.toLowerCase().includes(filter.name.toLowerCase()));

        if (filter?.state) list = list.filter(product => product.isActive === filter.state);

        if (filter?.markAsAddon) list = list.filter(product => filter.markAsAddon === 'addon' && product.markAsAddon);

        if (isDate(filter?.fromDate))
            list = list.filter(product =>
                !product.createdAt ? true : isAfterOrEqual(product.createdAt, filter?.fromDate as Date)
            );

        if (isDate(filter?.toDate))
            list = list.filter(product =>
                !product.createdAt ? true : isBeforeOrEqual(product.createdAt, filter?.toDate as Date)
            );

        return list;
    }, [products, filter]);

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
        setValue('markAsAddon', '');
        setValue('fromDate', null);
        setValue('toDate', null);

        setFilter(null);

        hideDropFilter();
    };

    const getProductList = useCallback(async () => {
        showLoader();

        const service = await productListService();

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setProducts(service.data as []);
    }, [hideLoader, notify, showLoader]);

    /* reactivity */
    useEffect(() => {
        getProductList();
    }, [getProductList]);

    /* props */
    const nameField: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: t('views.productlist.filter.form.name.placeholder'),
            ...register('name'),
        },
        isHintReserved: true,
        hint: {
            title: t('views.productlist.filter.form.name.hint'),
            hasDots: true,
            children: t('views.productlist.filter.form.name.hint'),
        },
    };
    const stateProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'select',
            placeholder: t('views.productlist.filter.form.state.placeholder'),
            options: [
                {
                    label: t('views.productlist.filter.form.state.active'),
                    value: 'active',
                },
                {
                    label: t('views.productlist.filter.form.state.inactive'),
                    value: 'inactive',
                },
            ],
            ...register('state'),
        },
        isHintReserved: true,
        hint: {
            children: t('views.productlist.filter.form.state.hint'),
            hasDots: true,
            title: t('views.productlist.filter.form.state.hint'),
        },
    };
    const markAsAddonProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'select',
            placeholder: t('views.productlist.filter.form.markasaddon.placeholder'),
            options: [
                {
                    label: t('views.productlist.filter.form.markasaddon.addon'),
                    value: 'addon',
                },
            ],
            ...register('markAsAddon'),
        },
        isHintReserved: true,
        hint: {
            children: t('views.productlist.filter.form.markasaddon.hint'),
            hasDots: true,
            title: t('views.productlist.filter.form.markasaddon.hint'),
        },
    };
    const fromDateField: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: t('views.productlist.filter.form.fromdate.placeholder'),
            strategy: 'date',
            ...register('fromDate'),
        },
        isHintReserved: true,
        hint: {
            title: t('views.productlist.filter.form.fromdate.hint'),
            hasDots: true,
            children: t('views.productlist.filter.form.fromdate.hint'),
        },
    };
    const toDateField: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: t('views.productlist.filter.form.todate.placeholder'),
            strategy: 'date',
            ...register('toDate'),
        },
        isHintReserved: true,
        hint: {
            title: t('views.productlist.filter.form.todate.hint'),
            hasDots: true,
            children: t('views.productlist.filter.form.todate.hint'),
        },
    };

    const filterFormFields: FieldSetProps[] = [nameField, stateProps, markAsAddonProps, fromDateField, toDateField];

    /* context */
    const context: ProductListContextProps = {
        /* states */
        productList,
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
