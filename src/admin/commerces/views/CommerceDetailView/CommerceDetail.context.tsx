/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { CommerceDetailContextProps, CommerceDetailProviderProps } from './CommerceDetail.props';

const Context = createContext<CommerceDetailContextProps>({
    /* states */
    commerce: null,
    isUpdateReference: false,
    showUpdateReference: () => {},
    hideUpdateReference: () => {},
    isUpdateSetting: false,
    showUpdateSetting: () => {},
    hideUpdateSetting: () => {},
    isUpdateAttention: false,
    showUpdateAttention: () => {},
    hideUpdateAttention: () => {},
    isUpdateDelivery: false,
    showUpdateDelivery: () => {},
    hideUpdateDelivery: () => {},
    /* functions */
    getCommerceDetail: () => new Promise(resolve => resolve()),
    /* props */
});

export const CommerceDetailProvider: FC<CommerceDetailProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useCommerceDetailContext = () => useContext(Context);
