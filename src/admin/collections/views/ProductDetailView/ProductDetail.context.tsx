/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { ProductDetailContextProps, ProductDetailProviderProps } from './ProductDetail.props';

const Context = createContext<ProductDetailContextProps>({
    /* states */
    product: null,
    mainTitleList: [],
    addonTitleList: [],
    isUpdateGeneral: false,
    showUpdateGeneral: () => {},
    hideUpdateGeneral: () => {},
    isUpdatePicture: false,
    showUpdatePicture: () => {},
    hideUpdatePicture: () => {},
    isUpdateCollection: false,
    showUpdateCollection: () => {},
    hideUpdateCollection: () => {},
    isUpdateAddon: false,
    showUpdateAddon: () => {},
    hideUpdateAddon: () => {},
    /* functions */
    getProductDetail: () => {},
    getMainTitleList: () => {},
    getAddonTitleList: () => {},
    handleGoBack: () => {},
});

export const ProductDetailProvider: FC<ProductDetailProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useProductDetailContext = () => useContext(Context);
