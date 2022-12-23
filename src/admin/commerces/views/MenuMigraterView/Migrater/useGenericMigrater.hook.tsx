/* react */
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
/* context */
import { useMenuMigraterContext } from '../MenuMigrater.context';
/* props */
import { FieldSetProps, useAdminNotify } from 'admin/core';
import { MenuMigraterForm } from '../MenuMigrater.props';
/* components */
import { Legend } from 'shared/components';
/* hooks */
import { useActive, useLoader } from 'shared/hooks';
/* utils */
import { amountFormat } from 'shared/utils';
/* services */
import { setMenuLayoutService } from 'admin/commerces/services';
/* types */
import { MenuTitleListItemDTO, TitleProductListItemDTO } from 'admin/commerces/types';
/* assets */
import { MdCheckCircle, MdDangerous, MdWarning } from 'react-icons/md';
/* styles */
import styles from './Migrater.module.scss';

export const useGenericMigrater = (menu: MenuTitleListItemDTO[]) => {
    /* states */
    const { commerceId } = useParams<{ commerceId: string }>();

    const { handleOpenCurrentMenuTab, handleSelectGenericMigrater, handlePostUpdateMenu } = useMenuMigraterContext();

    const { register, setValue, trigger, getValues, reset } = useForm<MenuMigraterForm>({
        mode: 'all',
        /* resolver: yupResolver(), */
    });

    const [isConfirmationModal, showConfirmationModal, hideConfirmationModal] = useActive(false);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    /* functions */
    const handleSubmit = async () => {
        showLoader();

        hideConfirmationModal();

        if (!(await trigger(['type', 'collection'], { shouldFocus: true }))) {
            hideLoader();

            return;
        }

        const data = {
            type: getValues().type,
            collection: getValues().collection?.reduce((prev: any[], { isSelected, titleId, items }) => {
                if (isSelected) {
                    return [
                        ...prev,
                        {
                            titleId: `${titleId}`,
                            items: items.reduce((prevItem: any[], { isSelected: isItemSelected, ...item }) => {
                                if (isItemSelected) {
                                    return [...prevItem, item];
                                }

                                return prevItem;
                            }, []),
                        },
                    ];
                }
                return prev;
            }, []),
        };

        if (data.collection?.length === 0) {
            hideLoader();

            notify('warning', {
                title: 'Warning',
                icon: <MdWarning />,
                text: 'Select at least a title menu',
                timestamp: new Date(),
            });

            return;
        }

        const service = await setMenuLayoutService(commerceId ?? '0', data);

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        handlePostUpdateMenu();

        notify('success', {
            title: 'Success',
            icon: <MdCheckCircle />,
            text: service.message,
            timestamp: new Date(),
        });

        reset();

        handleSelectGenericMigrater();

        handleOpenCurrentMenuTab();
    };

    const handleMergeMenu = () => {
        setValue('type', 'merge');

        showConfirmationModal();
    };

    const handleReplaceMenu = () => {
        setValue('type', 'replace');

        showConfirmationModal();
    };

    const handleCancelSubmit = hideConfirmationModal;

    const productProps = useCallback(
        (product: TitleProductListItemDTO, productIndex: number, titleIndex: number): FieldSetProps[] => {
            setValue(`collection.${titleIndex}.items.${productIndex}.productId`, product.productId);
            setValue(`collection.${titleIndex}.items.${productIndex}.isActive`, product.isActive);

            return [
                {
                    className: styles.SimpleCheckbox,
                    field: {
                        strategy: 'checkbox',
                        defaultChecked: true,
                        id: `collection.${titleIndex}.items.${productIndex}.isSelected`,
                        ...register(`collection.${titleIndex}.items.${productIndex}.isSelected`),
                    },
                    isHintReserved: true,
                    hint: {
                        title: product.defaultReference,
                        hasDots: true,
                        children: (
                            <label htmlFor={`collection.${titleIndex}.items.${productIndex}.isSelected`}>
                                <Legend hasDots>{product.defaultReference}</Legend>
                            </label>
                        ),
                    },
                },
                {
                    className: styles.Price,
                    disabled: true /* !watch(`collection.${titleIndex}.items.${productIndex}.isSelected`) */,
                    field: {
                        /* className: errors.collection?.[titleIndex]?.items?.[productIndex]?.price
                        ? FieldStyles.OutlineDanger
                        : FieldStyles.OutlinePrimary, */
                        strategy: 'text',
                        /* min: 0, */
                        /* step: 0.0001, */
                        /* placeholder: translate(), */
                        afterContent: 'USD',
                        defaultValue: amountFormat(product.price, 4),
                        ...register(`collection.${titleIndex}.items.${productIndex}.price`),
                    },
                    /* hint: {
                    children: translate(errors.collection?.[titleIndex]?.items?.[productIndex]?.price?.message ?? ''),
                    hasDots: true,
                    title: translate(errors.collection?.[titleIndex]?.items?.[productIndex]?.price?.message ?? ''),
                }, */
                },
            ];
        },
        [register, setValue]
    );

    const titleProps = useCallback(
        (menuTitle: MenuTitleListItemDTO, titleIndex: number): FieldSetProps[] => {
            setValue(`collection.${titleIndex}.titleId`, menuTitle.titleId);

            return [
                {
                    className: styles.Checkbox,
                    field: {
                        strategy: 'checkbox',
                        afterContent: <img src={menuTitle.url} alt={menuTitle.title} crossOrigin="anonymous" />,
                        id: `collection.${titleIndex}.isSelected`,
                        ...register(`collection.${titleIndex}.isSelected`),
                    },
                    isHintReserved: true,
                    hint: {
                        title: menuTitle.title,
                        hasDots: true,
                        children: (
                            <label htmlFor={`collection.${titleIndex}.isSelected`}>
                                <Legend hasDots>{menuTitle.title}</Legend>
                            </label>
                        ),
                    },
                },
                ...menuTitle.products.reduce((prev, current, index) => {
                    return [...prev, ...productProps(current, index, titleIndex)];
                }, [] as FieldSetProps[]),
            ];
        },
        [productProps, register, setValue]
    );

    /* props */
    const genericMigraterFields: FieldSetProps[] = useMemo(
        () => [
            ...menu.reduce((prev, current, index) => {
                return [...prev, ...titleProps(current, index)];
            }, [] as FieldSetProps[]),
        ],
        [menu, titleProps]
    );

    return {
        genericMigraterFields,
        handleMergeMenu,
        handleReplaceMenu,
        isConfirmationModal,
        type: getValues().type,
        handleCancelSubmit,
        handleSubmit,
    };
};
