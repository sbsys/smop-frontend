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
import { LinkedMenuProduct, MenuProduct } from 'admin/linked/types';
/* assets */
import { MdCheckCircle, MdDangerous } from 'react-icons/md';
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

    const [menuProductList, setMenuProductList] = useState<LinkedMenuProduct[]>([]);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { translate } = useAdminLang();

    const navigate = useNavigate();

    /* functions */
    const getLinkedTitleProducts = useCallback(async () => {
        setMenuProductList([]);

        showLoader();

        const service = await productLinkedListService(
            linkedCommerceSettings?.commerceId ?? '',
            Number.parseInt(titleId ?? '0')
        );

        hideLoader();

        unregister('collection');

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
        showLoader();

        const service = await updateLinkedProductListService(
            linkedCommerceSettings?.commerceId ?? '',
            Number.parseInt(titleId ?? '0'),
            {
                collection: data.collection,
            }
        );

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
        if (menuProductList.length === 0) return;

        menuProductList.forEach((menu, index) => {
            setValue(`collection.${index}.isAvailable`, menu.isAvailable);

            setValue(`collection.${index}.price`, menu.price);
        });
    }, [menuProductList, setValue]);

    /* props */
    const collectionProps = (product: MenuProduct, index: number): FieldSetProps[] => {
        if (!watch(`collection.${index}.isAvailable`))
            setValue(`collection.${index}.price`, menuProductList[index].price, {
                shouldDirty: true,
            });

        setValue(`collection.${index}.productId`, product.productId);

        return [
            /* select product props */
            {
                className: styles.Checkbox,
                field: {
                    id: `collection.${index}.isAvailable`,
                    strategy: 'checkbox',
                    beforeContent: (
                        <img
                            src={product.url}
                            alt={product.defaultReference}
                            crossOrigin="anonymous"
                            className={styles.Img}
                        />
                    ),
                    ...register(`collection.${index}.isAvailable`),
                },
                isHintReserved: true,
                hint: {
                    children: <label htmlFor={`collection.${index}.isAvailable`}>{product.defaultReference}</label>,
                    hasDots: true,
                    title: product.defaultReference,
                },
            },
            /* selected product price */
            {
                disabled: !watch(`collection.${index}.isAvailable`),
                field: {
                    className:
                        watch(`collection.${index}.isAvailable`) && errors.collection && errors.collection[index]?.price
                            ? FieldStyles.OutlineDanger
                            : FieldStyles.OutlinePrimary,
                    strategy: 'decimal',
                    placeholder: translate('menuedit.price.placeholder'),
                    beforeContent: '$',
                    min: 0,
                    step: getSteps,
                    defaultValue: product.price,
                    ...register(`collection.${index}.price`),
                },
                isHintReserved: true,
                hint:
                    watch(`collection.${index}.isAvailable`) && errors.collection && errors.collection[index]?.price
                        ? {
                              children: translate(errors.collection[index]?.price?.message as AdminLang),
                              hasDots: true,
                              title: translate(errors.collection[index]?.price?.message as AdminLang),
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
        ...[...menuProductList].reduce((prev, current, index) => {
            return [...prev, ...collectionProps(current, index)];
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
