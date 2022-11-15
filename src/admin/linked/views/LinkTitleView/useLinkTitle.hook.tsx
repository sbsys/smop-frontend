/* react */
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
/* props */
import { LinkTitleContextProps, LinkTitleFormData } from './LinkTitle.props';
/* context */
import { useCommerceManagementContext } from '../CommerceManagementView';
/* hooks */
import { useLoader } from 'shared/hooks';
import { AdminLang, FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
/* services */
import { menuNotLinkedListService, productLinkedListService } from 'admin/linked/services';
/* types */
import { LinkMenuProduct, MenuNotLinkedListItemDTO } from 'admin/linked/types';
/* assets */
import { MdDangerous } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';

export const useLinkTitle = () => {
    /* states */
    const {
        /* states */
        linkedCommerceSettings,
    } = useCommerceManagementContext();

    const {
        formState: { errors },
        handleSubmit,
        register,
        setValue,
        unregister,
        watch,
    } = useForm<LinkTitleFormData>({
        mode: 'all',
        /* resolver: yupResolver(), */
    });

    const [menus, setMenus] = useState<MenuNotLinkedListItemDTO[]>([]);

    const [menuProductList, setMenuProductList] = useState<LinkMenuProduct>({
        linked: [],
        unlinked: [],
    });

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { translate } = useAdminLang();

    const navigate = useNavigate();

    /* functions */
    const getMenuNotLinkedList = useCallback(async () => {
        showLoader();

        const service = await menuNotLinkedListService(linkedCommerceSettings?.commerceId ?? '');

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setMenus(service.data);
    }, [hideLoader, linkedCommerceSettings?.commerceId, notify, showLoader]);

    const getTitleProducts = useCallback(async () => {
        setValue('productCollection', []);

        showLoader();

        const service = await productLinkedListService(linkedCommerceSettings?.commerceId ?? '', watch('titleId'));

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setMenuProductList(service.data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hideLoader, linkedCommerceSettings?.commerceId, notify, setValue, showLoader, watch, watch('titleId')]);

    const cancelLinkMenu = () => navigate(-1);

    /* reactivity */
    useEffect(() => {
        getMenuNotLinkedList();
    }, [getMenuNotLinkedList]);

    useEffect(() => {
        if (watch('titleId')) getTitleProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getTitleProducts, watch, watch('titleId')]);

    /* props */
    const chooseTitleProps: FieldSetProps = {
        field: {
            className: errors.titleId ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'select',
            placeholder: translate('linkmenu.title.placeholder'),
            options: menus.map(menu => ({
                label: menu.defaultTitle,
                value: menu.titleId,
            })),
            ...register('titleId'),
        },
        isHintReserved: true,
        hint: errors.titleId
            ? {
                  children: translate(errors.titleId.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.titleId.message as AdminLang),
              }
            : {
                  children: translate('linkmenu.title.hint'),
                  hasDots: true,
                  title: translate('linkmenu.title.hint'),
              },
    };

    const linkTitleFieldProps: FieldSetProps[] = [];

    /* context */
    const context: LinkTitleContextProps = {
        /* states */
        menus,
        /* functions */
        cancelLinkMenu,
        /* props */
        chooseTitleProps,
        linkTitleFieldProps,
    };

    return { context };
};
