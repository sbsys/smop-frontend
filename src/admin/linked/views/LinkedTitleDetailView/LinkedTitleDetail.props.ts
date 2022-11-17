/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { TitleProductListItemDTO } from 'admin/collections';
import { MenuLinkedListItemDTO } from 'admin/linked/types';

export interface LinkedTitleDetailContextProps {
    /* states */
    linkedTitle: MenuLinkedListItemDTO | undefined;
    productList: (TitleProductListItemDTO & {
        price: number;
        url: string;
    })[];
    /* functions */
    handleCloseLinkedTitleDetail: () => void;
    handleEditLinkedTitleDetail: () => void;
}

export interface LinkedTitleDetailProviderProps extends ChildrenProps {
    context: LinkedTitleDetailContextProps;
}
