/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
import { AdminLang, FieldSetProps } from 'admin/core';
/* utils */
import * as yup from 'yup';
/* types */
import { LinkProduct, MenuNotLinkedListItemDTO } from 'admin/linked/types';

export interface LinkTitleContextProps {
    /* states */
    menus: MenuNotLinkedListItemDTO[];
    /* functions */
    handleLinkMenu: (e?: BaseSyntheticEvent) => Promise<void>;
    cancelLinkMenu: () => void;
    /* props */
    chooseTitleProps: FieldSetProps;
    linkTitleFieldProps: FieldSetProps[];
}

export interface LinkTitleProviderProps extends ChildrenProps {
    context: LinkTitleContextProps;
}

export interface LinkTitleFormData {
    titleId: number;
    productCollection: (LinkProduct & { isSelected: boolean })[];
}

export const LinkTitleSchema = yup
    .object({
        titleId: yup
            .number()
            .typeError('linkmenu.title.required' as AdminLang)
            .required('linkmenu.title.required' as AdminLang),
        productCollection: yup.array().of(
            yup
                .object({
                    price: yup.mixed().when(['isSelected'], {
                        is: (isSelected: boolean) => isSelected,
                        then: yup
                            .number()
                            .typeError('linkmenu.price.required' as AdminLang)
                            .required('linkmenu.price.required' as AdminLang)
                            .min(0, 'linkmenu.price.required' as AdminLang),
                        otherwise: yup
                            .number()
                            .typeError('linkmenu.price.required' as AdminLang)
                            .required('linkmenu.price.required' as AdminLang),
                    }),
                    isSelected: yup.boolean().required(),
                })
                .required()
        ),
    })
    .required();
