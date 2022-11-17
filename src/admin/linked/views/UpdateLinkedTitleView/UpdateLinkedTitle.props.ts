/* props */
import { ChildrenProps } from 'shared/props';
/* utils */
import * as yup from 'yup';
/* types */
import { LinkProduct, MenuLinkedListItemDTO } from 'admin/linked/types';
import { AdminLang, FieldSetProps } from 'admin/core';
import { BaseSyntheticEvent } from 'react';

export interface UpdateLinkedTitleContextProps {
    /* states */
    linkedTitle: MenuLinkedListItemDTO | undefined;
    linkedTitleFieldProps: FieldSetProps[];
    /* functions */
    cancelUpdateLinkedMenu: () => void;
    handleUpdateLinkedMenu: (e?: BaseSyntheticEvent) => Promise<void>;
}

export interface UpdateLinkedTitleProviderProps extends ChildrenProps {
    context: UpdateLinkedTitleContextProps;
}

export interface UpdateLinkedTitleFormData {
    productCollection: (LinkProduct & { isSelected: boolean })[];
}

export const UpdateLinkedTitleSchema = yup
    .object({
        productCollection: yup.array().of(
            yup
                .object({
                    price: yup.mixed().when(['isSelected'], {
                        is: (isSelected: boolean) => isSelected,
                        then: yup
                            .number()
                            .typeError('menuedit.price.required' as AdminLang)
                            .required('menuedit.price.required' as AdminLang)
                            .min(0, 'menuedit.price.required' as AdminLang),
                        otherwise: yup
                            .number()
                            .typeError('menuedit.price.required' as AdminLang)
                            .required('menuedit.price.required' as AdminLang),
                    }),
                    isSelected: yup.boolean().required(),
                })
                .required()
        ),
    })
    .required();
