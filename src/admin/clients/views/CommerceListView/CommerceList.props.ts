/* props */
import { ChildrenProps } from 'shared/props';

export interface CommerceListContextProps {}

export interface CommerceListProviderProps extends ChildrenProps {
    context: CommerceListContextProps;
}
