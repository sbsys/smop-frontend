/* react */
import { useForm } from 'react-hook-form';
/* props */
import { FieldSetProps } from 'admin/core';
import { MenuMigraterForm } from '../MenuMigrater.props';
/* context */
import { useMenuMigraterContext } from '../MenuMigrater.context';
/* types */
import { MenuTitleListItemDTO, TitleProductListItemDTO } from 'admin/commerces/types';
/* styles */
import styles from './Migrater.module.scss';
import { Legend } from 'shared/components';
import { amountFormat } from 'shared/utils';

export const useGenericMigrater = () => {
    /* states */
    const {
        /* states */
        menuMerge: { menu },
    } = useMenuMigraterContext();

    const {
        formState: { errors },
        handleSubmit,
        register,
        setValue,
        unregister,
        watch,
        resetField,
    } = useForm<MenuMigraterForm>({
        mode: 'all',
        /* resolver: yupResolver(), */
    });

    /* functions */
    const productProps = (
        product: TitleProductListItemDTO,
        productIndex: number,
        titleIndex: number
    ): FieldSetProps[] => {
        setValue(`collection.${titleIndex}.items.${productIndex}.productId`, product.productId);

        return [
            {
                className: styles.SimpleCheckbox,
                field: {
                    strategy: 'checkbox',
                    defaultChecked: true,
                    disabled: true,
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
    };

    const titleProps = (menuTitle: MenuTitleListItemDTO, titleIndex: number): FieldSetProps[] => {
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
    };

    /* props */
    const genericMigraterFields: FieldSetProps[] = [
        ...menu.reduce((prev, current, index) => {
            return [...prev, ...titleProps(current, index)];
        }, [] as FieldSetProps[]),
    ];

    return { genericMigraterFields };
};
