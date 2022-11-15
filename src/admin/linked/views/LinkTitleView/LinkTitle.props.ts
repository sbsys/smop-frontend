/* props */
import { ChildrenProps } from 'shared/props';
import { FieldSetProps } from 'admin/core';
/* types */
import { LinkProduct, MenuNotLinkedListItemDTO } from 'admin/linked/types';

export interface LinkTitleContextProps {
    /* states */
    menus: MenuNotLinkedListItemDTO[];
    /* functions */
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
