/* react */
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* props */
import { CreateCommerceContextProps, CreateCommerceForm } from './CreateCommerce.props';
/* services */
import { countryListService, createCommerceService } from 'admin/commerces/services';
/* types */
import { CountryListItemDTO } from 'admin/commerces/types';
/* assets */
import { MdCheckCircle, MdError } from 'react-icons/md';

export const useCreateCommerce = () => {
    /* states */
    const [countryList, setCountryList] = useState<CountryListItemDTO[]>([]);

    const formMethods = useForm<CreateCommerceForm>();

    const navigate = useNavigate();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    /* functions */
    const handleCreateCommerceSubmit = formMethods.handleSubmit(async data => {
        showLoader();

        const service = await createCommerceService(data);

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdError />,
                timestamp: new Date(),
                text: service.message,
            });

        notify('success', {
            title: 'Success',
            icon: <MdCheckCircle />,
            timestamp: new Date(),
            text: service.message,
        });

        navigate(-1);
    });

    const handleCancelCreateCommerce = () => navigate(-1);

    const getCountryList = useCallback(async () => {
        showLoader();

        const service = await countryListService({});

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdError />,
                timestamp: new Date(),
                text: service.message,
            });

        setCountryList(service.data);
    }, [hideLoader, notify, showLoader]);

    /* reactivity */
    useEffect(() => {
        getCountryList();
    }, [getCountryList]);

    /* props */
    /* context */
    const context: CreateCommerceContextProps = {
        /* states */
        countryList,
        /* functions */
        handleCreateCommerceSubmit,
        handleCancelCreateCommerce,
        /* props */
    };

    return { context, formMethods };
};
