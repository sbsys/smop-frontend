/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { LinkTitleContextProps, LinkTitleProviderProps } from './LinkTitle.props';

const Context = createContext<LinkTitleContextProps>({
    /* states */
    menus: [],
    /* functions */
    cancelLinkMenu: () => {},
    /* props */
    chooseTitleProps: { field: {} },
    linkTitleFieldProps: [],
});

export const LinkTitleProvider: FC<LinkTitleProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useLinkTitleContext = () => useContext(Context);
