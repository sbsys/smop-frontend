/* props */
import { ChildrenProps } from 'shared/props';

export interface SchemaLayoutContextProps {}

export interface SchemaLayoutProviderProps extends ChildrenProps {
    context: SchemaLayoutContextProps;
}
