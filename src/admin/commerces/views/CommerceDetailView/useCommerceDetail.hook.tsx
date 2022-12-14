/* react */
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
/* props */
import { CommerceDetailContextProps } from './CommerceDetail.props';
/* hooks */
import { useActive, useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* services */
import { commerceDetailService } from 'admin/commerces/services';
/* types */
import { CommerceDetailDTO } from 'admin/commerces/types';
/* assets */
import { MdDangerous } from 'react-icons/md';

export const useCommerceDetail = () => {
    /* states */
    const { commerceId } = useParams();

    const [commerce, setCommerce] = useState<CommerceDetailDTO | null>(null);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const navigate = useNavigate();

    const [isUpdateReference, showUpdateReference, hideUpdateReference] = useActive();
    const [isUpdateSetting, showUpdateSetting, hideUpdateSetting] = useActive();
    const [isUpdateAttention, showUpdateAttention, hideUpdateAttention] = useActive();
    const [isUpdateDelivery, showUpdateDelivery, hideUpdateDelivery] = useActive();

    /* functions */
    const getCommerceDetail = useCallback(async () => {
        showLoader();

        const service = await commerceDetailService({ commerceId: commerceId ?? '' });

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setCommerce(service.data);
    }, [commerceId, hideLoader, notify, showLoader]);

    const handleGoBack = () => navigate(-1);

    /* reactivity */
    useEffect(() => {
        getCommerceDetail();
    }, [getCommerceDetail]);

    /* props */

    /* context */
    const context: CommerceDetailContextProps = {
        /* states */
        commerce,
        isUpdateReference,
        showUpdateReference,
        hideUpdateReference,
        isUpdateSetting,
        showUpdateSetting,
        hideUpdateSetting,
        isUpdateAttention,
        showUpdateAttention,
        hideUpdateAttention,
        isUpdateDelivery,
        showUpdateDelivery,
        hideUpdateDelivery,
        /* functions */
        getCommerceDetail,
        handleGoBack,
        /* props */
    };

    return { context };
};
