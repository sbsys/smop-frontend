/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
/* props */
import { LinkTitleContextProps, LinkTitleFormData, LinkTitleSchema } from './LinkTitle.props';
/* context */
import { useCommerceManagementContext } from '../CommerceManagementView';
import { useCommerceMenuContext } from '../CommerceMenuView';
/* hooks */
import { useLoader } from 'shared/hooks';
import { AdminLang, FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
/* services */
import { linkProductListService, menuNotLinkedListService, productLinkedListService } from 'admin/linked/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
/* types */
import { LinkedMenuProduct, MenuNotLinkedListItemDTO, MenuProduct } from 'admin/linked/types';
/* assets */
import { MdCheckCircle, MdDangerous, MdWarning } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';
import styles from './LinkTitle.module.scss';

export const useLinkTitle = () => {
    /* states */
    const {
        /* states */
        linkedCommerceSettings,
    } = useCommerceManagementContext();

    const {
        /* functions */
        getMenuLinkedList,
    } = useCommerceMenuContext();

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

    const {
        formState: { errors },
        handleSubmit,
        register,
        setValue,
        unregister,
        watch,
    } = useForm<LinkTitleFormData>({
        mode: 'all',
        resolver: yupResolver(LinkTitleSchema),
    });

    const [menus, setMenus] = useState<MenuNotLinkedListItemDTO[]>([]);

    const [menuProductList, setMenuProductList] = useState<LinkedMenuProduct[]>([]);

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
        setMenuProductList([]);

        showLoader();

        const service = await productLinkedListService(linkedCommerceSettings?.commerceId ?? '', watch('titleId'));

        hideLoader();

        unregister('productCollection');

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setMenuProductList(service.data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hideLoader, linkedCommerceSettings?.commerceId, notify, showLoader, unregister, watch, watch('titleId')]);

    const cancelLinkMenu = () => navigate(-1);

    const handleLinkMenu = handleSubmit(async data => {
        if (!data.productCollection?.find(product => product.isSelected))
            return notify('warning', {
                title: 'Warning',
                icon: <MdWarning />,
                text: translate('linkmenu.price.min'),
                timestamp: new Date(),
            });

        showLoader();

        const service = await linkProductListService(linkedCommerceSettings?.commerceId ?? '', {
            productCollection: data.productCollection,
        });

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
            timestamp: new Date(),
            text: service.message,
        });

        getMenuLinkedList();

        navigate(-1);
    });

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

    const productCollectionProps = (product: MenuProduct, index: number): FieldSetProps[] => {
        if (!watch(`productCollection.${index}.isSelected`)) setValue(`productCollection.${index}.price`, 0);

        setValue(`productCollection.${index}.productId`, product.productId);

        return [
            /* select product props */
            {
                className: styles.Checkbox,
                field: {
                    id: `productCollection.${index}.isSelected`,
                    strategy: 'checkbox',
                    beforeContent: (
                        <img
                            src={product.url}
                            alt={product.defaultReference}
                            crossOrigin="anonymous"
                            className={styles.Img}
                        />
                    ),
                    ...register(`productCollection.${index}.isSelected`),
                },
                isHintReserved: true,
                hint: {
                    children: (
                        <label htmlFor={`productCollection.${index}.isSelected`}>{product.defaultReference}</label>
                    ),
                    hasDots: true,
                    title: product.defaultReference,
                },
            },
            /* selected product price */
            {
                disabled: !watch(`productCollection.${index}.isSelected`),
                field: {
                    className:
                        errors.productCollection && errors.productCollection[index]?.price
                            ? FieldStyles.OutlineDanger
                            : FieldStyles.OutlinePrimary,
                    strategy: 'decimal',
                    placeholder: translate('linkmenu.price.placeholder'),
                    beforeContent: '$',
                    min: 0,
                    step: getSteps,
                    ...register(`productCollection.${index}.price`),
                },
                isHintReserved: true,
                hint:
                    errors.productCollection && errors.productCollection[index]?.price
                        ? {
                              children: translate(errors.productCollection[index]?.price?.message as AdminLang),
                              hasDots: true,
                              title: translate(errors.productCollection[index]?.price?.message as AdminLang),
                          }
                        : {
                              children: translate('linkmenu.price.hint'),
                              hasDots: true,
                              title: translate('linkmenu.price.hint'),
                          },
            },
        ];
    };

    const linkTitleFieldProps: FieldSetProps[] = [
        ...menuProductList.reduce((prev, current, index) => {
            return [...prev, ...productCollectionProps(current, index)];
        }, [] as FieldSetProps[]),
    ];

    /* context */
    const context: LinkTitleContextProps = {
        /* states */
        menus,
        /* functions */
        handleLinkMenu,
        cancelLinkMenu,
        /* props */
        chooseTitleProps,
        linkTitleFieldProps,
    };

    return { context };
};
