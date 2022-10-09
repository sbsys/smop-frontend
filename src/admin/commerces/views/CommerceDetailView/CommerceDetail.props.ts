/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { CommerceDetailDTO } from 'admin/commerces/types';

export interface CommerceDetailContextProps {
    /* states */
    commerce: CommerceDetailDTO | null;
    isUpdateReference: boolean;
    showUpdateReference: () => void;
    hideUpdateReference: () => void;
    isUpdateSetting: boolean;
    showUpdateSetting: () => void;
    hideUpdateSetting: () => void;
    isUpdateAttention: boolean;
    showUpdateAttention: () => void;
    hideUpdateAttention: () => void;
    /* functions */
    getCommerceDetail: () => Promise<void>;
    /* props */
}

export interface CommerceDetailProviderProps extends ChildrenProps {
    context: CommerceDetailContextProps;
}
