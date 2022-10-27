import { createContext, FC, useContext } from 'react';
import { ProductListContextProps, ProductListProviderProps } from './ProductList.props';

const Context = createContext<ProductListContextProps>({
    /* states */
    productList: [],
    isDropFilter: false,
    showDropFilter: () => {},
    hideDropFilter: () => {},
    isBreakPoint: false,
    /* functions */
    handleFilter: () => new Promise(resolve => resolve),
    handleResetFilter: () => {},
    /* props */
    filterFormFields: [],
});

export const ProductListProvider: FC<ProductListProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useProductListContext = () => useContext(Context);
