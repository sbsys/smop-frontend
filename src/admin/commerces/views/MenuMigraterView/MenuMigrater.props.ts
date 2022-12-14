/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { CommerceDetailDTO, MenuMergeDTO, MenuTitleListItemDTO } from 'admin/commerces/types';

export interface MenuMigraterContextProps {
    /* states */
    commerce: CommerceDetailDTO | null;
    currentMenu: MenuTitleListItemDTO[];
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
    handlePostUpdateMenu: () => void;
}

export interface MenuMigraterProviderProps extends ChildrenProps {
    context: MenuMigraterContextProps;
}

interface ProductItem {
    productId: string;
    price: number;
    isActive: boolean;
    isSelected: boolean;
}

interface CollectionItem {
    titleId: number;
    items: ProductItem[];
    isSelected: boolean;
}

export interface MenuMigraterForm {
    type: 'merge' | 'replace';
    collection: CollectionItem[];
}
