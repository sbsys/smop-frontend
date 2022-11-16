/* props */
import { ChildrenProps } from 'shared/props';

export interface UpdateLinkedTitleContextProps {
    /* functions */
    cancelUpdateLinkedMenu: () => void;
}

export interface UpdateLinkedTitleProviderProps extends ChildrenProps {
    context: UpdateLinkedTitleContextProps;
}
