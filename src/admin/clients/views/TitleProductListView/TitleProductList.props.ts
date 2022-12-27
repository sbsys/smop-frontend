/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { MainMenuListItem, TitleProductListItem } from 'admin/clients/types';

export interface TitleProductListContextProps {
    /* states */
    menuTitle: MainMenuListItem | null;
    productList: TitleProductListItem[];
    selectedProductToAdd: TitleProductListItem | null;
    /* functions */
    handleSelectedProductToAddToCart: (productId: string) => () => void;
    handleUnSelectedProductToAddToCart: () => void;
}

export interface TitleProductListProviderProps extends ChildrenProps {
    context: TitleProductListContextProps;
}
