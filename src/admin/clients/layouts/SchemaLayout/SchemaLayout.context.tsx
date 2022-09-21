/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { SchemaLayoutContextProps, SchemaLayoutProviderProps } from './SchemaLayout.props';

export const SchemaLayoutContext = createContext<SchemaLayoutContextProps>({});

export const SchemaLayoutProvider: FC<SchemaLayoutProviderProps> = ({ context, children }) => {
    return (
        <SchemaLayoutContext.Provider value={context}>
            {typeof children === 'function' ? children() : children}
        </SchemaLayoutContext.Provider>
    );
};

export const useSchemaLayoutContext = () => useContext(SchemaLayoutContext);
