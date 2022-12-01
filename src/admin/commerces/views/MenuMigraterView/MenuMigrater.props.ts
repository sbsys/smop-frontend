/* props */
import { ChildrenProps } from 'shared/props';

export interface MenuMigraterContextProps {}

export interface MenuMigraterProviderProps extends ChildrenProps {
    context: MenuMigraterContextProps;
}
