/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { MenuMergeDTO } from 'admin/commerces/types';

export interface MenuMigraterContextProps {
    /* states */
    menuMerge: MenuMergeDTO;
    isCurrentMenuTabOpen: boolean;
    isMigraterTabOpen: boolean;
    handleOpenCurrentMenuTab: () => void;
    handleOpenMigraterTab: () => void;
    isBreakPoint: boolean;
    isCommerceMigraterSelected: boolean;
    isGenericMigraterSelected: boolean;
    handleSelectCommerceMigrater: () => void;
    handleSelectGenericMigrater: () => void;
}

export interface MenuMigraterProviderProps extends ChildrenProps {
    context: MenuMigraterContextProps;
}
