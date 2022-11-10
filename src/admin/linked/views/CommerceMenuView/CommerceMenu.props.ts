import { ChildrenProps } from 'shared/props';

export interface CommerceMenuContextProps {}

export interface CommerceMenuProviderProps extends ChildrenProps {
    context: CommerceMenuContextProps;
}
