/* react */
import { useContext } from 'react';
/* context */
import { LoaderContext } from 'shared/components';

export const useLoader = () => {
    return useContext(LoaderContext);
};
