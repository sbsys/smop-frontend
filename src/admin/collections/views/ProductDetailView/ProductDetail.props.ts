/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { MainTitleListItemDTO, ProductDetailDTO, TitleListItemDTO } from 'admin/collections/types';

export interface ProductDetailContextProps {
    /* states */
    product: ProductDetailDTO | null;
    mainTitleList: MainTitleListItemDTO[];
    addonTitleList: TitleListItemDTO[];
    /* functions */
    getProductDetail: () => void;
    getMainTitleList: () => void;
    getAddonTitleList: () => void;
}

export interface ProductDetailProviderProps extends ChildrenProps {
    context: ProductDetailContextProps;
}
