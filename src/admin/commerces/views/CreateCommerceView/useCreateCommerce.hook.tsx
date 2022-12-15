/* react */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* props */
import { CreateCommerceContextProps, CreateCommerceForm, CreateCommerceSchema } from './CreateCommerce.props';
import { TabsLayoutRef } from 'shared/layouts';
/* services */
import { countryListService, createCommerceService } from 'admin/commerces/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
/* types */
import { CountryListItemDTO } from 'admin/commerces/types';
/* assets */
import { MdCheckCircle, MdError } from 'react-icons/md';
import { validateServiceSchedule } from 'admin/commerces/utils';

export const useCreateCommerce = () => {
    /* states */
    const [countryList, setCountryList] = useState<CountryListItemDTO[]>([]);

    const formMethods = useForm<CreateCommerceForm>({
        mode: 'all',
        resolver: yupResolver(CreateCommerceSchema),
        shouldUnregister: false,
    });

    const navigate = useNavigate();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    const tabRef = useRef<TabsLayoutRef | null>(null);

    /* functions */
    const handleCreateCommerceSubmit = formMethods.handleSubmit(async data => {
        return console.log(validateServiceSchedule(data.serviceHours.onsite));
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

    const handleNextTab = useCallback(() => tabRef.current?.nextTab(), []);
    const handlePrevTab = useCallback(() => tabRef.current?.prevTab(), []);

    /* reactivity */
    useEffect(() => {
        getCountryList();
    }, [getCountryList]);

    /* props */
    /* context */
    const context: CreateCommerceContextProps = {
        /* states */
        countryList,
        tabRef,
        /* functions */
        handleCreateCommerceSubmit,
        handleCancelCreateCommerce,
        handleNextTab,
        handlePrevTab,
        /* props */
    };

    return { context, formMethods };
};
