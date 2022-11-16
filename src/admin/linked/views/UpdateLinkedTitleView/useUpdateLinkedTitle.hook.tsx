/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
/* props */
import { UpdateLinkedTitleContextProps } from './UpdateLinkedTitle.props';
/* context */
import { useCommerceManagementContext } from '../CommerceManagementView';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminLang, useAdminNotify } from 'admin/core';
/* types */
import { LinkMenuProduct } from 'admin/linked/types';
import { productLinkedListService } from 'admin/linked/services';
import { MdDangerous } from 'react-icons/md';

export const useUpdateLinkedTitle = () => {
    /* states */
    const { titleId } = useParams<{ titleId: string }>();

    const {
        /* states */
        linkedCommerceSettings,
    } = useCommerceManagementContext();

    const getSteps = useMemo(() => {
        const decimals = linkedCommerceSettings?.decimals ?? 0;

        const steps = [...Array(decimals)].reduce((prev, _, index) => {
            if (index === 0) {
                if (decimals === 1) return '0.1';
                else return '0.0';
            }

            if (index === decimals - 1) return `${prev}1`;

            return `${prev}0`;
        }, '1');

        return steps;
    }, [linkedCommerceSettings?.decimals]);

    const [menuProductList, setMenuProductList] = useState<LinkMenuProduct>({
        linked: [],
        unlinked: [],
    });

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { translate } = useAdminLang();

    const navigate = useNavigate();

    /* functions */
    const getLinkedTitleProducts = useCallback(async () => {
        setMenuProductList({
            linked: [],
            unlinked: [],
        });

        showLoader();

        const service = await productLinkedListService(
            linkedCommerceSettings?.commerceId ?? '',
            Number.parseInt(titleId ?? '0')
        );

        hideLoader();

        /* unregister('productCollection'); */

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setMenuProductList(service.data);
    }, [hideLoader, linkedCommerceSettings?.commerceId, notify, showLoader, titleId]);

    const cancelUpdateLinkedMenu = () => navigate(-1);

    /* reactivity */
    useEffect(() => {
        getLinkedTitleProducts();
    }, [getLinkedTitleProducts]);

    /* context */
    const context: UpdateLinkedTitleContextProps = {
        /* functions */
        cancelUpdateLinkedMenu,
    };

    return { context };
};
