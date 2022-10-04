/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { CommerceListContextProps } from './CommerceList.props';
import { FieldSetProps, useAdminNotify } from 'admin/core';
/* hooks */
import { useLoader } from 'shared/hooks';
/* types */
import { CommerceListItemDTO } from 'admin/commerces/types';
/* assets */
import { MdCheckCircle, MdDangerous } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';

interface CommerceListFilterForm {
    name: string;
    fromDate: Date;
    toDate: Date;
}

export const useCommerceList = () => {
    /* states */
    const { handleSubmit, reset } = useForm<CommerceListFilterForm>();

    const [commerces, setCommerces] = useState<CommerceListItemDTO[]>([]);

    const [filter, setFilter] = useState<CommerceListFilterForm | null>(null);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { t } = useTranslation();

    const commerceList = useMemo(() => {
        let list = commerces.slice();

        if (filter?.name)
            list = list.filter(commerce => commerce.name.toLowerCase().includes(filter.name.toLowerCase()));

        return list;
    }, [commerces, filter]);

    /* functions */
    const handleFilter = handleSubmit(data => {
        setFilter(data);
    });

    const handleResetFilter = () => {
        reset();

        setFilter(null);
    };

    const getCommerceList = useCallback(async () => {
        showLoader();

        const service = await { error: true, message: 'Commerce Lists Error', data: [] };

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        notify('success', {
            title: 'Success',
            icon: <MdCheckCircle />,
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
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            children: t('views.commercelist.filter.form.referencename.hint'),
        },
    };

    const fromDateField: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: t('views.commercelist.filter.form.fromdate.placeholder'),
            strategy: 'date',
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
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            children: t('views.commercelist.filter.form.todate.hint'),
        },
    };

    const filterFormFields: FieldSetProps[] = [referenceNameField, fromDateField, toDateField];

    /* context */
    const context: CommerceListContextProps = {
        /* states */
        commerceList,
        /* functions */
        handleFilter,
        handleResetFilter,
        /* props */
        filterFormFields,
    };

    return { context };
};
