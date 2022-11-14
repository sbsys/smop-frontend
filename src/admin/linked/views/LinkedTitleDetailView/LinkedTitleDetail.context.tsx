/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { LinkedTitleDetailContextProps, LinkedTitleDetailProviderProps } from './LinkedTitleDetail.props';

const Context = createContext<LinkedTitleDetailContextProps>({
    /* states */
    linkedTitle: undefined,
    productList: [],
    /* functions */
    handleCloseLinkedTitleDetail: () => {},
});

export const LinkedTitleDetailProvider: FC<LinkedTitleDetailProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useLinkedTitleDetailContext = () => useContext(Context);
