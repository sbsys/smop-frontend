/* react */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
/* props */
import { CreateProductContextProps, CreateProductFormData, CreateProductSchema } from './CreateProduct.props';
/* layouts */
import { TabsLayoutRef } from 'shared/layouts';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* services */
import { addonsTitleListService, createProductService, mainTitleListService } from 'admin/collections/services';
/* types */
import { ComplementTitleListItemDTO, MainTitleListItemDTO } from 'admin/collections/types';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
/* assets */
import { MdCheckCircle, MdError } from 'react-icons/md';

export const useCreateProduct = () => {
    /* states */
    const [mainTitleList, setMainTitleList] = useState<MainTitleListItemDTO[]>([]);
    const [addonTitleList, setAddonTitleList] = useState<ComplementTitleListItemDTO[]>([]);

    const formMethods = useForm<CreateProductFormData>({
        mode: 'all',
        resolver: yupResolver(CreateProductSchema),
    });

    const navigate = useNavigate();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    const tabRef = useRef<TabsLayoutRef | null>(null);

    /* functions */
    const handleCreateProductSubmit = formMethods.handleSubmit(async data => {
        showLoader();

        if (data.multiLanguage) {
            data.defaultReference = data.referenceCollection[0].refs;
            data.defaultDescription = data.descriptionCollection[0].refs;
        } else {
            data.referenceCollection = [];
            data.descriptionCollection = [];
        }

        const service = await createProductService({
            ...data,
            referenceCollection: data.referenceCollection.map(reference => ({
                lang: reference.lang,
                ref: reference.refs,
            })),
            descriptionCollection: data.descriptionCollection.map(description => ({
                lang: description.lang,
                ref: description.refs,
            })),
            image: (data.image?.length ?? 0) > 0 ? data.image[0] : undefined,
        });

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

    const handleCancelCreateProduct = () => navigate(-1);

    const handleNextTab = useCallback(() => tabRef.current?.nextTab(), []);
    const handlePrevTab = useCallback(() => tabRef.current?.prevTab(), []);

    const getMainTitleList = useCallback(async () => {
        showLoader();

        const service = await mainTitleListService();

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdError />,
                timestamp: new Date(),
                text: service.message,
            });

        setMainTitleList(service.data);
    }, [hideLoader, notify, showLoader]);

    const getAddonTitleList = useCallback(async () => {
        showLoader();

        const service = await addonsTitleListService();

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdError />,
                timestamp: new Date(),
                text: service.message,
            });

        setAddonTitleList(service.data);
    }, [hideLoader, notify, showLoader]);

    /* reactivity */
    useEffect(() => {
        getMainTitleList();
    }, [getMainTitleList]);

    useEffect(() => {
        getAddonTitleList();
    }, [getAddonTitleList]);

    /* context */
    const context: CreateProductContextProps = {
        /* states */
        mainTitleList,
        addonTitleList,
        tabRef,
        /* functions */
        handleCreateProductSubmit,
        handleCancelCreateProduct,
        handleNextTab,
        handlePrevTab,
    };

    return { context, formMethods };
};
