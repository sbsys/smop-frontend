/* props */
import { ChildrenProps } from 'shared/props';

export interface CommerceListContextProps {
    /* functions */
    handleSelectCommerce: (commerceId: string) => () => void;
}

export interface CommerceListProviderProps extends ChildrenProps {
    context: CommerceListContextProps;
}
