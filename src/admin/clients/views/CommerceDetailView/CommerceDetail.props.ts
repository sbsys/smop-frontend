import { ChildrenProps } from 'shared/props';

export interface CommerceDetailContextProps {}

export interface CommerceDetailProviderProps extends ChildrenProps {
    context: CommerceDetailContextProps;
}
