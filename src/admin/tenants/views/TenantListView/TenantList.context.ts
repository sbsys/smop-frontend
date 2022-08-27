/* react */
import { createContext } from 'react';
/* props */
import { TenantListContextProps } from './TenantList.props';

export const TenantListContext = createContext<TenantListContextProps>({});
