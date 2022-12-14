/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { MainTitleListItemDTO, ProductDetailDTO, ComplementTitleListItemDTO } from 'admin/collections/types';

export interface ProductDetailContextProps {
    /* states */
    product: ProductDetailDTO | null;
    mainTitleList: MainTitleListItemDTO[];
    addonTitleList: ComplementTitleListItemDTO[];
    isUpdateGeneral: boolean;
    showUpdateGeneral: () => void;
    hideUpdateGeneral: () => void;
    isUpdatePicture: boolean;
    showUpdatePicture: () => void;
    hideUpdatePicture: () => void;
    isUpdateCollection: boolean;
    showUpdateCollection: () => void;
    hideUpdateCollection: () => void;
    isUpdateAddon: boolean;
    showUpdateAddon: () => void;
    hideUpdateAddon: () => void;
    /* functions */
    getProductDetail: () => void;
    getMainTitleList: () => void;
    getAddonTitleList: () => void;
    handleGoBack: () => void;
}

export interface ProductDetailProviderProps extends ChildrenProps {
    context: ProductDetailContextProps;
}
