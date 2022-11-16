/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { UpdateLinkedTitleContextProps, UpdateLinkedTitleProviderProps } from './UpdateLinkedTitle.props';

const Context = createContext<UpdateLinkedTitleContextProps>({
    /* functions */
    cancelUpdateLinkedMenu: () => {},
});

export const UpdateLinkedTitleProvider: FC<UpdateLinkedTitleProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useUpdateLinkedTitleContext = () => useContext(Context);
