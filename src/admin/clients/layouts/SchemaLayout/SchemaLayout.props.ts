/* props */
import { ChildrenProps } from 'shared/props';

export interface SchemaLayoutContextProps {
    /* states */
    isOrganization: boolean;
}

export interface SchemaLayoutProviderProps extends ChildrenProps {
    context: SchemaLayoutContextProps;
}
