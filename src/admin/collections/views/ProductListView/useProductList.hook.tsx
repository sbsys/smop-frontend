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
import { parse } from 'date-fns';
import { matchBreakPoint } from 'shared/utils';
/* assets */
import { MdDangerous } from 'react-icons/md';
import { FieldStyles } from 'shared/styles';

interface ProductListFilterForm {
    name: string;
    /* state: TitleState | ''; */
    fromDate: Date | null;
    toDate: Date | null;
}

export const useProductList = () => {
    /* states */
    const { handleSubmit, register, setValue } = useForm<ProductListFilterForm>();

    const [products, setProducts] = useState<[]>([]);

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

        /* if (filter?.name)
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
            ); */

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
        setValue('fromDate', null);
        setValue('toDate', null);

        setFilter(null);

        hideDropFilter();
    };

    const getProductList = useCallback(async () => {
        showLoader();

        const service = await { error: true, message: 'Product list', data: [] };

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
            hasDots: true,
            children: t('views.productlist.filter.form.name.hint'),
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
            hasDots: true,
            children: t('views.productlist.filter.form.todate.hint'),
        },
    };

    const filterFormFields: FieldSetProps[] = [nameField, fromDateField, toDateField];

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
