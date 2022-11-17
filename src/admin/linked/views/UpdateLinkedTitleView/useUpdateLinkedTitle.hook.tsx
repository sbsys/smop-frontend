/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
/* props */
import {
    UpdateLinkedTitleContextProps,
    UpdateLinkedTitleFormData,
    UpdateLinkedTitleSchema,
} from './UpdateLinkedTitle.props';
/* context */
import { useCommerceManagementContext } from '../CommerceManagementView';
import { useCommerceMenuContext } from '../CommerceMenuView';
/* hooks */
import { useLoader } from 'shared/hooks';
import { AdminLang, FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
/* services */
import { productLinkedListService, updateLinkedProductListService } from 'admin/linked/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
/* types */
import { LinkMenuProduct, LinkProduct, MenuProduct } from 'admin/linked/types';
/* assets */
import { MdCheckCircle, MdDangerous, MdWarning } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';
import styles from './UpdateLinkedTitle.module.scss';

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

    const {
        /* states */
        linkedTitleList,
        /* functions */
        getMenuLinkedList,
    } = useCommerceMenuContext();

    const linkedTitle = useMemo(
        () => linkedTitleList.find(title => `${title.titleId}` === titleId),
        [linkedTitleList, titleId]
    );

    const {
        formState: { errors },
        handleSubmit,
        register,
        setValue,
        unregister,
        watch,
    } = useForm<UpdateLinkedTitleFormData>({
        mode: 'all',
        resolver: yupResolver(UpdateLinkedTitleSchema),
    });

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

        unregister('productCollection');

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setMenuProductList(service.data);
    }, [hideLoader, linkedCommerceSettings?.commerceId, notify, showLoader, titleId, unregister]);

    const cancelUpdateLinkedMenu = () => navigate(-1);

    const handleUpdateLinkedMenu = handleSubmit(async data => {
        if (!data.productCollection?.find(product => product.isSelected))
            return notify('warning', {
                title: 'Warning',
                icon: <MdWarning />,
                text: translate('menuedit.price.min'),
                timestamp: new Date(),
            });

        showLoader();

        const service = await updateLinkedProductListService(linkedCommerceSettings?.commerceId ?? '', {
            titleId: Number.parseInt(titleId ?? '0'),
            productCollection: data.productCollection.reduce((prev, current) => {
                if (!current.isSelected) return prev;

                return [
                    ...prev,
                    {
                        titleId: current.titleId,
                        productId: current.productId,
                        price: current.price,
                    },
                ];
            }, [] as LinkProduct[]),
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
        getLinkedTitleProducts();
    }, [getLinkedTitleProducts]);

    useEffect(() => {
        if (menuProductList.linked.length === 0) return;

        menuProductList.linked.forEach((menu, index) => {
            setValue(`productCollection.${index}.isSelected`, true);

            setValue(`productCollection.${index}.price`, menu.price);
        });
    }, [menuProductList.linked, setValue]);

    /* props */
    const productCollectionProps = (product: MenuProduct, index: number): FieldSetProps[] => {
        if (!watch(`productCollection.${index}.isSelected`)) setValue(`productCollection.${index}.price`, 0);

        setValue(`productCollection.${index}.titleId`, Number.parseInt(titleId ?? '0'));
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
                    placeholder: translate('menuedit.price.placeholder'),
                    beforeContent: '$',
                    min: 0,
                    step: getSteps,
                    defaultValue: product.price,
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
                              children: translate('menuedit.price.hint'),
                              hasDots: true,
                              title: translate('menuedit.price.hint'),
                          },
            },
        ];
    };

    const linkedTitleFieldProps: FieldSetProps[] = [
        ...[...menuProductList.linked, ...menuProductList.unlinked].reduce((prev, current, index) => {
            return [...prev, ...productCollectionProps(current, index)];
        }, [] as FieldSetProps[]),
    ];

    /* context */
    const context: UpdateLinkedTitleContextProps = {
        /* states */
        linkedTitle,
        linkedTitleFieldProps,
        /* functions */
        cancelUpdateLinkedMenu,
        handleUpdateLinkedMenu,
    };

    return { context };
};
